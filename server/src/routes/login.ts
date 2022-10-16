import express from 'express'
import { z } from 'zod'
import { User } from '../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { serialize } from 'cookie'

export const loginRouter = express.Router()

loginRouter.post('/login', async (req, res) => {
    const Input = z.object({
        name: z.string().min(2).max(20).trim(),
        password: z.string(),
    })

    // makes sure req.body is of valid type
    if (!Input.safeParse(req.body).success) {
        return res.status(400).send({ message: 'Invalid types' })
    }

    const input: z.infer<typeof Input> = req.body

    // find user by the given name
    const userWithGivenName = await User.findOne({
        name: { $regex: input.name, $options: 'i' },
    })

    // if the user does not exit, we create one
    if (!userWithGivenName) {
        const user = await User.create({
            ...input,
            avatar_url: `https://avatars.dicebear.com/api/open-peeps/${input.name}.svg`,
            password: bcrypt.hashSync(input.password, 10),
        })

        const userInfo = {
            _id: user._id,
            name: user.name,
            avatar_url: user.avatar_url,
        }

        const session = jwt.sign(userInfo, process.env.PRIVATE_KEY as string)

        // res.cookie('session', session, {
        //     httpOnly: true,
        //     maxAge: 60 * 60 * 24 * 7, // 1 week
        // })

        // return res.send('Whippi')

        // res.setHeader(
        //     'Set-Cookie',
        //     serialize('session', session, {
        //         httpOnly: true,
        //         maxAge: 60 * 60 * 24 * 7, // 1 week
        //     })
        // )

        return res.json({
            user: userInfo,
            session,
            login: false,
            cookie: serialize('session', session, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7, // 1 week
            }),
        })
    }

    const passwordsMatch = bcrypt.compareSync(
        input.password,
        userWithGivenName.password as string
    )
    if (!passwordsMatch) {
        return res.status(401).send({
            message: 'Password mismatch',
        })
    }

    const userInfo = {
        _id: userWithGivenName._id,
        name: userWithGivenName.name,
        avatar_url: userWithGivenName.avatar_url,
    }

    const session = jwt.sign(userInfo, process.env.PRIVATE_KEY as string)

    res.setHeader(
        'Set-Cookie',
        serialize('session', session, {
            httpOnly: false,
            maxAge: 60 * 60 * 24 * 7, // 1 week
        })
    )

    return res.json({
        user: userInfo,
        session,
        login: false,
    })
})
