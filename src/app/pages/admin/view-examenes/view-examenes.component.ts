import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-examenes',
  templateUrl: './view-examenes.component.html',
  styleUrls: ['./view-examenes.component.css']
})
export class ViewExamenesComponent implements OnInit{

  examenes:any =[

  ]

  constructor(
    private examenService:ExamenService
  ){}


  ngOnInit(): void {
    this.examenService.listarCuestionarios().subscribe({
      next:(data:any) =>{
        this.examenes = data;
        console.log(this.examenes);
      },
      error:(error) => {
        console.log(error);
        Swal.fire("Error","Error al cargar los examenes","error");
      },
      complete: () => console.log("listado de exámenes completo!!")
    });
  }

  eliminarExamen(examenId:any){
    Swal.fire({
      title:'Eliminar Examen',
      text:"¿Está seguro de eliminar el examen?",
      icon:"warning",
      showCancelButton:true,
      confirmButtonColor:'#3085D6',
      cancelButtonColor:'#D33',
      confirmButtonText:"Eliminar",
      cancelButtonText:"Cancelar"
    }).then((result) =>{
      if(result.isConfirmed){
        this.examenService.eliminarExamen(examenId).subscribe({
          next:(data) =>{
            this.examenes = this.examenes.filter((examen:any) => examen.examenId != examenId);
            Swal.fire("Examen eliminado","El examen ha sido eliminado con exito","success");
          },
          error:(error)=>{
            Swal.fire("Error","Erro al eliminar el examen","error");
          },
          complete: () => console.log("Eliminar examen completo!")
        })
      }
    });

  }
  

}
