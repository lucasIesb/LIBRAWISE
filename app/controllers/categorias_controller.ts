import type { HttpContext } from '@adonisjs/core/http'

import Categoria from '#models/categoria'


export default class CategoriasController {

    async index({request}: HttpContext){

        // http://localhost:3333/categoria?page=1&perPage=5

        const page = request.input('page', 1)
        const perPage = request.input('perPage', 10)

        return await Categoria.query().paginate(page, perPage)
    }

    async show({params}: HttpContext){
        return await Categoria.findOrFail(params.id)
    }

    async store({request}: HttpContext){
        const dados = request.only(['nome', 'instrucoes', 'tempo_de_preparo', 'num_porcoes', 'categoria_id'])
        return await Categoria.create(dados)
    }

    async update({params, request}: HttpContext){

        const receita = await Categoria.findOrFail(params.id)
        const dados = request.only(['nome', 'instrucoes', 'tempo_de_preparo', 'num_porcoes', 'categoria_id'])

        receita.merge(dados)
        return await receita.save()
    }

    async destroy({params}: HttpContext){
        const categoria = await Categoria.findOrFail(params.id)
        
        await categoria.delete()
        return {msg: 'Registro deletado com sucesso', categoria}
    }
}