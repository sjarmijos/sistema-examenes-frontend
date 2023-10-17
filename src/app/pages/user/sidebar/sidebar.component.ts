import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoriaServiceService } from 'src/app/services/categoria-service.service';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit{
  
  categorias:any;
  constructor(
    private categoriaService:CategoriaServiceService,
    private snack:MatSnackBar
  ){}

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe({
      next:(data:any) => {
        this.categorias = data;
      },
      error:(error) =>{
        console.log(error);
        this.snack.open("Error al cargar las categorías","",{
          duration:3000
        })
      },
      complete:()=> console.log("listar categorias en usuario completo!!")
    });
  }
}
