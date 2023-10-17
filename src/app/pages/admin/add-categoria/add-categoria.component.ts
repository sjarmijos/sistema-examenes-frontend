import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoriaServiceService } from 'src/app/services/categoria-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css']
})
export class AddCategoriaComponent {

  categoria ={
    titulo: '',
    descripcion: ''
  }

  constructor(
    private categoriaService:CategoriaServiceService,
    private snack:MatSnackBar,
    private router:Router
    ){}

  formSubmit(){
    if(this.categoria.titulo.trim() == '' || this.categoria.titulo == null){
      this.snack.open("El título es requerido!!", '', {
        duration:3000
      });
      return;
    }

    this.categoriaService.agregarCategoria(this.categoria).subscribe({
      next: (data:any) => {
        this.categoria.titulo = '';
        this.categoria.descripcion = '';
        Swal.fire("Categoría Agregada","La categoría ha sido agregada con éxito","success");
        
      },
      error:(error) =>{
        console.log(error)
        Swal.fire("Error!!","Error al guardar la categoría","error")
      },
      complete: () => this.router.navigate(['/admin/categorias'])
    })

  }
}
