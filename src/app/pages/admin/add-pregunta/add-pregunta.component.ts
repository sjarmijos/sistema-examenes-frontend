import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PreguntaService } from 'src/app/services/pregunta.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-pregunta',
  templateUrl: './add-pregunta.component.html',
  styleUrls: ['./add-pregunta.component.css']
})
export class AddPreguntaComponent implements OnInit{

  titulo='';
  examenId:any;
  pregunta:any = {
    examen:{},
    contenido:'',
    opcion1:'',
    opcion2:'',
    opcion3:'',
    opcion4:'',
    respuesta:''
  };

  constructor(
    private preguntaService:PreguntaService,
    private route:ActivatedRoute,
    private router:Router,
    private snack:MatSnackBar
  ){}
  ngOnInit(): void {
    this.titulo = this.route.snapshot.params['titulo'];
    this.examenId = this.route.snapshot.params['examenId'];
    this.pregunta.examen['examenId'] = this.examenId;
  }

  formSubmit(){
    if(this.pregunta.contenido.trim() == '' || this.pregunta.contenido == null){
      return;
    }
    if(this.pregunta.opcion1.trim() == '' || this.pregunta.opcion1 == null){
      return;
    }
    if(this.pregunta.opcion2.trim() == '' || this.pregunta.opcion2 == null){
      return;
    }
    if(this.pregunta.opcion3.trim() == '' || this.pregunta.opcion3 == null){
      return;
    }
    if(this.pregunta.opcion4.trim() == '' || this.pregunta.opcion4 == null){
      return;
    }
    if(this.pregunta.respuesta.trim() == '' || this.pregunta.respuesta == null){
      return;
    }

    this.preguntaService.guardarPregunta(this.pregunta).subscribe({
      next:(data)=>{
        Swal.fire("Pregunta guardada","La pregunta agregada con éxito","success");
        console.log(data);
      },
      error:(error) => {
        console.log("error");
        Swal.fire("Error","Error al guardar la pregunta","error");
      },
      complete: () => {
        console.log("Guardar pregunta completado!!")
        this.pregunta.contenido='';
        this.pregunta.opcion1='',
        this.pregunta.opcion2='',
        this.pregunta.opcion3='',
        this.pregunta.opcion4='',
        this.pregunta.respuesta=''
        this.router.navigate(['/admin/ver-preguntas/'+this.examenId+'/'+this.titulo]);
      }
    });
  }
}
