import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono, MiddlewareHandler } from "hono";
import { verify } from 'hono/jwt';
import { createBlogInput, updateBlogInput } from "@subhash_svs/blog-common";

export const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string,
        JWT_SECRET : string
    },
    Variables : {
        "user_id"  : string,
        "prisma" : PrismaClient
    }
}>();


const ClientAndAuthenticate: MiddlewareHandler = async (c, next) => {
  //authentication
  const header = c.req.header('Authorization');
  if(!header){
    c.status(403);
    return c.json({
      error : "Unauthorized"
    })
  }
  //bearer type authorization header
  const token = header.split(' ')[1];
  const res = await verify(token,c.env.JWT_SECRET);
  if(!res){
    c.status(403);
    return c.json({
      error : "Unauthorized"
    });
  }
  c.set("user_id",res.id);

  //client initialiser
  const prisma = new PrismaClient({
    datasourceUrl : c.env.DATABASE_URL
  }).$extends(withAccelerate());
  c.set("prisma",prisma);

  await next();
}

blogRouter.use('/*',ClientAndAuthenticate);

blogRouter.post('/', async (c) => {
  const author_id = c.get("user_id");
  const prisma = c.get("prisma");

  const body = await c.req.json();
  const success = createBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message : "Invalid Inputs"
    })
  }
  const blog = await prisma.post.create({
    data:{
      title : body.title,
      content : body.content,
      authorId : author_id
    }
  })
  return c.json({
    message : "Post Created"
  })
})

blogRouter.put('/', async (c) => {
  const prisma = c.get("prisma");

  const body = await c.req.json();
  const success = updateBlogInput.safeParse(body);
  if(!success){
    c.status(411);
    return c.json({
      message : "Invalid Inputs"
    })
  }
  const res = await prisma.post.update({
    where : {
      id : body.id
    },
    data: {
      title : body.title,
      content : body.content,
    }
  })

  return c.json({
    message : "Post Updated"
  })
})

blogRouter.get('/bulk', async (c) => {
  const prisma = c.get("prisma");
  const blogs = await prisma.post.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      author : {
        select : {
          name : true
        }
      }
    }
  });
  return c.json({blogs : blogs});
})

blogRouter.get('/:id', async (c) => {
  const post_id = c.req.param("id");
  const prisma = c.get("prisma");

  const post = await prisma.post.findUnique({
    where : {
      id : post_id
    },
    select : {
      id : true,
      title : true,
      content : true,
      author : {
        select : {
          name : true
        }
      }
    }
  })

  return c.json(post);
})
