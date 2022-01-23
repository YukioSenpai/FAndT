import { Prisma } from '@prisma/client'
import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { Context, prisma } from './prisma/client'
import { Login, UserUpdate } from './types'
import { APP_SECRET } from './utils'

export const resolvers = {
    Query: {
      me: async (context: Context) => {
          return prisma.user.findUnique({
            where: {
              //TODO
              id: 2,
            },
          })
      },
      users: async () => {
        return await prisma.user.findMany()
      }
    },
    Mutation: {
        signupUser: async (_parent: any, args: Login) => {
          const { data: { email, password } } = args
          const hashedPassword = await hash(password, 10)

          const userEmail = Prisma.validator<Prisma.UserSelect>()({
            email: true,
          })

          const user = await prisma.user.findUnique({
            where: {
              email
            },
            select: userEmail
          })

          if (user) {
            throw new Error(`A user already exist with this email`)
          }

          const newUser = await prisma.user.create({
            data: {
              email: email,
              password: hashedPassword,
            },
          })

            return {token : sign({ userId: newUser.id }, APP_SECRET, {expiresIn: '1y'}), user: newUser};
        },
        loginUser: async (_parent: any, args: Login)  => {
          const { data: { email, password } } = args

          const user = await prisma.user.findUnique({
            where: {
              email
            },
          })

          if (!user) {
            throw new Error(`No user found for email: ${email}`)
          }

          const passwordValid = await compare(password, user.password)

          if (!passwordValid) {
            throw new Error('Invalid password')
          }

          const token = sign({ userId: user.id }, APP_SECRET, {expiresIn: '1d'})

          return {
            token,
            user,
          }
        },
        deleteUser: async (_parent: any, args: {id: number}) => await prisma.user.delete({
            where: { id: Number(args.id) },
          }),
          updateUser: async (_parent: any, args: UserUpdate) => {
            const {user : {email, firstName, lastName}} = args

            return await prisma.user.update({
              where: {
                email
              },
              data: {
                firstName,
                lastName,
                email
              },
            })
          }
      }
  }