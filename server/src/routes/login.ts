import express from 'express'
import { z } from 'zod'
import { User } from '../models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const loginRouter = express.Router()

loginRouter.post('/login', async (req, res) => {
    const Input = z.object({
        name: z.string().min(2).max(20),
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
            password: bcrypt.hashSync(input.password, 10),
        })
        return res.json({
            session: jwt.sign(
                {
                    _id: user._id,
                    name: user.name,
                },
                process.env.PRIVATE_KEY as string
            ),
            login: false,
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
    return res.json({
        session: jwt.sign(
            {
                _id: userWithGivenName._id,
                name: userWithGivenName.name,
            },
            process.env.PRIVATE_KEY as string
        ),
        login: true,
    })
})
