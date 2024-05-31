/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

import CategoriasController from '#controllers/categorias_controller'
import ResenhaesController from '#controllers/resenhas_controller'
import EditorasController from '#controllers/editoras_controller'
import EmprestimosController from '#controllers/emprestimos_controller'


router.get('/', async () => {
  return {
    hello: 'world',
  }
})


router.resource('/categoria', CategoriasController).apiOnly()
router.resource('/resenha', ResenhaesController).apiOnly()
router.resource('/emprestimo', EmprestimosController).apiOnly()
router.resource('/editora', EditorasController).apiOnly()







