import { Hono,MiddlewareHandler } from "hono"; 
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { signinInput, signupInput } from "@subhash_svs/blog-common";
import bcrypt  from 'bcryptjs';

export const userRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string;
        JWT_SECRET : string;
    }
    Variables : {
        user_id : string;
        prisma : PrismaClient;
    }
}>();

const initialiseClient:MiddlewareHandler = async (c, next)=>{
    const prisma = new PrismaClient({
      datasourceUrl : c.env.DATABASE_URL
    }).$extends(withAccelerate());
    c.set("prisma",prisma);
    await next();
  }

  userRouter.post('/signup', initialiseClient, async (c) => {
    const prisma = c.get("prisma");
    const body = await c.req.json();

    const success = signupInput.safeParse(body);
    if(!success.success){
      c.status(411);
      return c.json({
        message : "Invalid Inputs"
      })
    }

    const existingUser = await prisma.user.findUnique({
      where : {
        email : body.email
      }
    });
    if(existingUser){
      c.status(409);
      return c.json({
        message : "User already exists with this email"
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(body.password,saltRounds);
    const user = await prisma.user.create({
      data : {
        email : body.email,
        password : hashedPassword,
        name : body.name
      }
    })
    const token = await sign({
      id : user.id
    },c.env.JWT_SECRET);
  
    return c.json({
      token : token
    });
  })
  
  userRouter.post('/signin', initialiseClient, async (c) => {
    const prisma = c.get('prisma');
  
    const body = await c.req.json();
    const success = signinInput.safeParse(body);
    if(!success.success){
      c.status(411);
      return c.json({
        message : "Invalid Inputs"
      })
    }

    const user = await prisma.user.findUnique({
      where : {
        email : body.email
      }
    });
    if(!user){
      c.status(403);
      return c.json({
        message : "Invalid credentials"
      });
    }

    const validPassword = await bcrypt.compare(body.password,user.password);
  
    if(!validPassword){
      c.status(403);
      return c.json({
        error : "Invalid Credentials"
      });
    }
  
    const token = await sign({id:user.id},c.env.JWT_SECRET);
    return c.json({
      token : token
    });
  })
  