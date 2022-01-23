import { Prisma } from '@prisma/client'
import { compare, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { Context, prisma } from './prisma/client'
import { Login, UserUpdate } from './types'
import { APP_SECRET, getUserId } from './utils'

export const resolvers = {
    Query: {
      me: async (context: Context) => {
        const userId = getUserId(context)
          return prisma.user.findUnique({
            where: {
              id: Number(userId),
            },
          })
      },
      users: async () => {
        return await prisma.user.findMany()
      }
    },
    Mutation: {
        signupUser: async (_parent: any, args: Login, context: Context) => {
          const { data: { email, password } } = args
          const hashedPassword = await hash(password, 10)

          console.log(context.req.headers["authorization"])

          const userEmail = Prisma.validator<Prisma.UserSelect>()({
            email: true,
          })

          const user = await context.prisma.user.findUnique({
            where: {
              email
            },
            select: userEmail
          })

          if (user) {
            throw new Error(`A user already exist with this email`)
          }

          const newUser = await context.prisma.user.create({
            data: {
              email: email,
              password: hashedPassword,
            },
          })

            return {token : sign({ userId: newUser.id }, APP_SECRET, {expiresIn: '1y'}), user: newUser};
        },
        loginUser: async (_parent: any, args: Login, context: Context)  => {
          const { data: { email, password } } = args

          const user = await context.prisma.user.findUnique({
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
          return {
            token: sign({ userId: user.id }, APP_SECRET, {expiresIn: '1d'}),
            user,
          }
        },
        deleteUser: async (_parent: any, args: {id: number}, context: Context) => await context.prisma.user.delete({
            where: { id: Number(args.id) },
          }),
          updateUser: async (_parent: any, args: UserUpdate, context: Context) => {
            const {user : {email, firstName, lastName}} = args

            return await context.prisma.user.update({
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