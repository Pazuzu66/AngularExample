import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductoModule } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit 
{
  productoForm: FormGroup;
  titulo= 'Crear Producto';
  id: string | null;
  constructor(private fb: FormBuilder,
              private router: Router,
              private toastr: ToastrService,
              private productoService: ProductoService,
              private aRoute: ActivatedRoute)
  {
    this.productoForm = this.fb.group({
      //Estamos poniendo que estos campoos son requeridos
      producto: ['', Validators.required],
      categoria: ['', Validators.required],
      ubicacion: ['', Validators.required],
      precio: ['', Validators.required]
    })
    this.id = this.aRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void 
  {
    this.esEditar();
  }
  agregarProducto()
  {
    const PRODUCTO: ProductoModule = 
    {
      nombre: this.productoForm.get('producto')?.value,
      categoria: this.productoForm.get('categoria')?.value,
      ubicacion: this.productoForm.get('ubicacion')?.value,
      precio: this.productoForm.get('precio')?.value
    }
    if(this.id !==null)
    {
      //editamos
      this.productoService.editarProducto(this.id,PRODUCTO).subscribe(data =>
        {
          this.toastr.success('Actualizacion Realizada con Exito!', 'Producto Actualizado!');
          this.router.navigate(['/']);
        },error=>
        {
          console.log(error);
          this.productoForm.reset();
        })
    }
    else
    {
      //agregamos
      console.log(PRODUCTO);
      this.productoService.guardarProducto(PRODUCTO).subscribe(data =>
        {
          this.toastr.success('Registro Realizado con Exito!', 'Producto Registrado!');
          this.router.navigate(['/']);
        },error => 
        {
          console.log(error);
          this.productoForm.reset();
        })
    }
    
    
  }

  esEditar()
  {
    if(this.id !==null)
    {
      this.titulo = 'Editar Producto';
      this.productoService.obtenerProducto(this.id).subscribe(data =>
        {
          this.productoForm.setValue
          ({
            producto: data.nombre,
            categoria: data.categoria,
            ubicacion: data.ubicacion,
            precio: data.precio
          })
        })
    }
  }
}
