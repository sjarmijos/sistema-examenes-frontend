import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ExamenService } from 'src/app/services/examen.service';

@Component({
  selector: 'app-load-examen',
  templateUrl: './load-examen.component.html',
  styleUrls: ['./load-examen.component.css']
})
export class LoadExamenComponent implements OnInit{

  catId:any;
  examenes:any;

  constructor(
    private route:ActivatedRoute,
    private examenService:ExamenService
  ){}


  ngOnInit(): void {
    this.catId = this.route.params.subscribe((params) => {
      this.catId = params['catId'];
      if(this.catId == 0){
        console.log("cargando todos los examenes");
        this.examenService.obtenerExamenesActivos().subscribe({
          next:(data) => {
            this.examenes=data;
            console.log(this.examenes);
          },
          error:(error)=>{
            console.log(error);
          },
          complete:()=> console.log("Usuario: listar todos los examenes completo")
        });
      }else{
        console.log("cargando un examen específico");
        this.examenService.obtenerExamenesActivosDeUnaCategoria(this.catId).subscribe({
          next:(data:any) => {
            this.examenes = data;
            console.log(this.examenes);
          },
          error:(error) => {
            console.log(error);
          },
          complete:() => console.log("Cargar un examen individual completo")
        });
      }
    });

  

  }



}
