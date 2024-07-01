import fastify, { FastifyInstance } from "fastify";
import { userRoutes } from "./routes/use.routes";
import { ContactRoutes } from "./routes/contact.routes";

const app: FastifyInstance = fastify({logger: true})

app.register(userRoutes, {
    prefix: '/users'
})

app.register(ContactRoutes, {
    prefix: '/contacts'
})


app.listen({
    port: 8080,

},() => console.log('Sever is running on port 8080') )