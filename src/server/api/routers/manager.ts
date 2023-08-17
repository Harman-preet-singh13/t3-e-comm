import { inferAsyncReturnType } from "@trpc/server";
import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
  createTRPCContext,
} from "~/server/api/trpc";

export const managerRouter = createTRPCRouter({

  //creating address
  create: protectedProcedure
    .input(z.object({ address_details: z.string(), phone_number: z.string() }))
    .mutation(async ({ input: { address_details, phone_number }, ctx }) => {
      const user_details = await ctx.prisma.address.create({
        data: { address_details, phone_number, userId: ctx.session.user.id }
      })

      return user_details
    }),

  getAddress: protectedProcedure
    .query(async ({ ctx }) => {
      const address = await getUserAddress({ ctx })
      return address
    }),

  createOrder: protectedProcedure
    .input(z.object({ product_id: z.string(), product_title: z.string(), product_image: z.string() }))
    .mutation(async ({ input: { product_id, product_title,product_image  }, ctx }) => {
      const order_details = await ctx.prisma.order.create({
        data: { product_id, product_title, product_image, userId: ctx.session.user.id }
      })

      return order_details
    }),

  getOrder: protectedProcedure
    .query(async ({ ctx }) => {
      const order = await getUserOrder({ ctx })
      return order
    }),

    deleteOrder: protectedProcedure
    .input(z.object({id: z.string()}))
    .mutation(async({input: {id}, ctx})=> {

      const order = await ctx.prisma.order.delete({
        where: {id}
      })

      return order;
    }),

    createWishlist: protectedProcedure
    .input(z.object({ product_id: z.string(), product_title: z.string(), product_image: z.string() }))
    .mutation(async ({ input: { product_id, product_title, product_image }, ctx }) => {
      
      const existingWishlistEntry = await ctx.prisma.wishlist.findFirst({
        where: {
          product_id,
          userId: ctx.session.user.id,
        },
      });
     
      if (existingWishlistEntry) {
        return { alreadyInWishlist: true };
      }

      const wishlist_details = await ctx.prisma.wishlist.create({
        data: { product_id, product_title, product_image, userId: ctx.session.user.id },
      });

      return wishlist_details;
    }),


    getWishlist: protectedProcedure
    .query(async ({ ctx }) => {
      const wishlist = await getUserWishlist({ ctx })
      return wishlist
    }),

    deleteWishlist: protectedProcedure
    .input(z.object({id: z.string()}))
    .mutation(async({input: {id}, ctx})=> {

      const wishlist = await ctx.prisma.wishlist.delete({
        where: {id}
      })

      return wishlist;
    }),
      
});

async function getUserWishlist({
  ctx
}: {
  ctx: inferAsyncReturnType<typeof createTRPCContext>
}) {

  const userId = ctx.session?.user.id

  const wishlist = await ctx.prisma.wishlist.findMany({
    where: {
      userId
    }
  })

  return wishlist;
}

async function getUserOrder({
  ctx
}: {
  ctx: inferAsyncReturnType<typeof createTRPCContext>
}) {

  const userId = ctx.session?.user.id

  const order = await ctx.prisma.order.findMany({
    where: {
      userId
    }
  })

  return order;
}


async function getUserAddress({
  ctx
}: {
  ctx: inferAsyncReturnType<typeof createTRPCContext>
}) {

  const userId = ctx.session?.user.id

  const address = await ctx.prisma.address.findFirst({
    where: {
      userId
    }
  })

  return address;
}
