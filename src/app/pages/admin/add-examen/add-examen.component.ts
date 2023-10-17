import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoriaServiceService } from 'src/app/services/categoria-service.service';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-examen',
  templateUrl: './add-examen.component.html',
  styleUrls: ['./add-examen.component.css']
})
export class AddExamenComponent implements OnInit{

  categorias:any = []
  examenData = {
    titulo:'',
    descripcion:'',
    puntosMaximos:'',
    numeroDePreguntas:'',
    activo:true,
    categoria:{
      categoriaId:''
    }
  }

  constructor(
    private categoriaService:CategoriaServiceService,
    private snack:MatSnackBar,
    private examenService:ExamenService,
    private router:Router
  ){}

  ngOnInit(): void {
    this.categoriaService.listarCategorias().subscribe({
      next:(data:any) =>{
        this.categorias = data;
        console.log(this.categorias);
      },
      error:(error) =>{
        console.log(error);
        Swal.fire("Error!!","Error al cargar los datos","error");
      },
      complete: () => console.log("Añadir examen completo!!")
    });
  }

  guardarExamen(){
    console.log(this.examenData);
    if(this.examenData.titulo.trim() == '' ||
    this.examenData.titulo == null){

      this.snack.open("El titulo es requerido",'',{
        duration:3000
      });
      return;
    }

    this.examenService.agregarExamen(this.examenData).subscribe({
      next:(data)=>{
        console.log(data);
        Swal.fire("Examen guardado!!","El examen ha sido guardado con éxito","success");
        this.examenData = {
          titulo:'',
          descripcion:'',
          puntosMaximos:'',
          numeroDePreguntas:'',
          activo:true,
          categoria:{
            categoriaId:''
          }
        }
      },
      error: (error) =>{
        console.log(error);
      },
      complete:() => this.router.navigate(['/admin/examenes'])
    });
  }

}
