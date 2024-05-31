import type { HttpContext } from '@adonisjs/core/http'

import Resenha from '#models/resenha'


export default class ResenhaesController {

    async index({request}: HttpContext){

        // http://localhost:3333/resenha?page=1&perPage=5

        const page = request.input('page', 1)
        const perPage = request.input('perPage', 10)

        return await Resenha.query().paginate(page, perPage)
    }

    async show({params}: HttpContext){
        return await Resenha.findOrFail(params.id)
    }

    async store({request}: HttpContext){
        const dados = request.only(['nome', 'instrucoes', 'tempo_de_preparo', 'num_porcoes', 'categoria_id'])
        return await Resenha.create(dados)
    }

    async update({params, request}: HttpContext){

        const receita = await Resenha.findOrFail(params.id)
        const dados = request.only(['nome', 'instrucoes', 'tempo_de_preparo', 'num_porcoes', 'categoria_id'])

        receita.merge(dados)
        return await receita.save()
    }

    async destroy({params}: HttpContext){
        const resenha = await Resenha.findOrFail(params.id)
        
        await resenha.delete()
        return {msg: 'Registro deletado com sucesso', resenha}
    }
}