import { Component, OnInit } from '@angular/core';
import { CategoriaServiceService } from 'src/app/services/categoria-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-categorias',
  templateUrl: './view-categorias.component.html',
  styleUrls: ['./view-categorias.component.css']
})
export class ViewCategoriasComponent implements OnInit{

  categorias:any =[

  ]

  constructor(private categoriaService:CategoriaServiceService){

  }
  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe({
      next:(Data:any) => {
        this.categorias = Data;
        console.log(this.categorias);
      },
      error:(error) =>{
        console.log(error);
        Swal.fire("Error!!","Error al cargar las categorias","error");
      },
      complete: () => console.log("Listar categorias completo!")
    });
  }



}
