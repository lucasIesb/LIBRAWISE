import type { HttpContext } from '@adonisjs/core/http'

import Editora from '#models/editora'


export default class EditorasController {

    async index({request}: HttpContext){

        // http://localhost:3333/editora?page=1&perPage=5

        const page = request.input('page', 1)
        const perPage = request.input('perPage', 10)

        return await Editora.query().paginate(page, perPage)
    }

    async show({params}: HttpContext){
        return await Editora.findOrFail(params.id)
    }

    async store({request}: HttpContext){
        const dados = request.only(['nome', 'instrucoes', 'tempo_de_preparo', 'num_porcoes', 'categoria_id'])
        return await Editora.create(dados)
    }

    async update({params, request}: HttpContext){

        const receita = await Editora.findOrFail(params.id)
        const dados = request.only(['nome', 'instrucoes', 'tempo_de_preparo', 'num_porcoes', 'categoria_id'])

        receita.merge(dados)
        return await receita.save()
    }

    async destroy({params}: HttpContext){
        const editora = await Editora.findOrFail(params.id)
        
        await editora.delete()
        return {msg: 'Registro deletado com sucesso', editora}
    }
}