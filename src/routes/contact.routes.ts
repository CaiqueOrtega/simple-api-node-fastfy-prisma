import { FastifyInstance } from "fastify";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { ContactCreate } from "../interfaces/contact.interface";
import { ContactUseCase } from "../usecases/contact.usecase";

export async function ContactRoutes(fastify: FastifyInstance) {
    const contactUseCase = new ContactUseCase();
    fastify.addHook('preHandler', AuthMiddleware);

    fastify.post<{ Body: ContactCreate }>('/', async (req, reply) => {
        const { name, email, phone } = req.body;

        const emailUser = req.headers['email']
        try {
            const data = await contactUseCase.create({ email, name, phone, userEmail: emailUser });
            return reply.send(data);
        } catch (error) {
            reply.send(error)
        }
    });

    fastify.get('/', async(req, replay) =>{
        const emailUser = req.headers['email'];
        try{
            const data = await contactUseCase.listAllContacts(emailUser)
            return replay.send(data)
        }catch(error){
            replay.send(error)
        }
    })
}
