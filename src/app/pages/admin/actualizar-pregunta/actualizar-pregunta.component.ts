import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-pregunta',
  templateUrl: './actualizar-pregunta.component.html',
  styleUrls: ['./actualizar-pregunta.component.css']
})
export class ActualizarPreguntaComponent implements OnInit{

  preguntaId:any = 0;
  pregunta:any;
  examen:any;

  constructor(
    private route:ActivatedRoute,
    private preguntaService:PreguntaService,
    private router:Router
  ){}
  ngOnInit(): void {
    this.preguntaId = this.route.snapshot.params['preguntaId'];
    this.preguntaService.obtenerPregunta(this.preguntaId).subscribe({
      next:(data:any) => {
        console.log(data);
        this.pregunta = data;
      },
      error: (error) =>{
        console.log(error)
      },
      complete: () => console.log("Obtener Pregunta Completado!!")
    });
  }

  public actualizarDatosDeLaPregunta(){
    this.preguntaService.actualizarPregunta(this.pregunta).subscribe({
      next: (data) => {
        Swal.fire("Pregunta Actualizada","La pregunta ha sido actualizada correctamente","success");
        console.log(data);
      },
      error:(error) => {
        console.log(error);
      },
      complete: () => {
        this.router.navigate(['/admin/ver-preguntas/'+this.pregunta.examen.examenId+'/'+this.pregunta.examen.titulo]);
        console.log("Actualizar pregunta completado!!")
      }

    })
  }


}
