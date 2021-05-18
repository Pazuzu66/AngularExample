import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
//components
import { ListarProductosComponent } from './components/listar-productos/listar-productos.component';

const routes: Routes = 
[
  //En caso de que la ruta este vacia haremos lo siguiente
  {path: '', component: ListarProductosComponent},
  //Rutas de CRUD
  {path: 'crear-producto', component: CrearProductoComponent},
  {path: 'editar-producto/:id', component: CrearProductoComponent},
  //WildCard o como se escriba, sirve para cuando se ingresa una ruta no existente
  //Lo que hace es redireccionarnos a donde queramos
  {path: '**',redirectTo: '',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
