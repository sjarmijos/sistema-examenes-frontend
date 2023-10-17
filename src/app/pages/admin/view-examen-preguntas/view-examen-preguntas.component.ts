import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-examen-preguntas',
  templateUrl: './view-examen-preguntas.component.html',
  styleUrls: ['./view-examen-preguntas.component.css']
})
export class ViewExamenPreguntasComponent implements OnInit{

  examenId:any;
  titulo:any;
  preguntas:any=[

  ];

  constructor(
    private route:ActivatedRoute,
    private preguntaService:PreguntaService,
    private snack:MatSnackBar
  ){}
  ngOnInit(): void {
    this.examenId = this.route.snapshot.params['examenId'];
    this.titulo = this.route.snapshot.params['titulo'];
    this.preguntaService.listarPreguntasDelExamen(this.examenId).subscribe({
      next:(data) =>{
        console.log(data);
        this.preguntas = data;
      },
      error: (error) =>{
        console.log(error);
      },
      complete: () => console.log("listar preguntas del examen completo!!")
    });
  }

  eliminarPregunta(preguntaId:any){
    Swal.fire({
      title:'Eliminar Pregunta',
      text:'¿Está seguro, desea eliminar esta pregunta?',
      icon:'warning',
      showCancelButton:true,
      confirmButtonColor:'#3085D6',
      cancelButtonColor:'#D33',
      confirmButtonText:'Eliminar',
      cancelButtonText:'Cancelar'
    }).then((resultado)=>{
      if(resultado.isConfirmed){
        this.preguntaService.eliminarPregunta(preguntaId).subscribe({
          next:(data) => {
            this.snack.open("Pregunta eliminada","",{
              duration:3000
            });
            this.preguntas = this.preguntas.filter((pregunta:any) => pregunta.preguntaId != preguntaId);
            console.log(data);
          },
          error:(error) => {
            console.log(error);
            this.snack.open("Error al eliminar la pregunta","",{
              duration:3000
            })
          },
          complete: () => console.log("Eliminar pregunta completado!!")
        });
      }
    })
  }
}
