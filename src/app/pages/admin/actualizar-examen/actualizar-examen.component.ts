import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaServiceService } from 'src/app/services/categoria-service.service';
import { ExamenService } from 'src/app/services/examen.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-examen',
  templateUrl: './actualizar-examen.component.html',
  styleUrls: ['./actualizar-examen.component.css']
})
export class ActualizarExamenComponent implements OnInit{

  examenId = 0;
  examen:any;
  categorias:any;

  constructor(
    private route:ActivatedRoute,
    private examenService:ExamenService,
    private categoriaService:CategoriaServiceService,
    private router:Router){

  }

  ngOnInit(): void {
    //obtenemos el id del examen de los parametros
    this.examenId = this.route.snapshot.params['examenId'];

    //obtenemos el objeto examen vinculado al id obtenido
    this.examenService.obtenerExamen(this.examenId).subscribe({
      next:(data) =>{
        this.examen = data;
        console.log(this.examen);
      },
      error:(error) =>{
        console.log(error);
      },
      complete: ()=> console.log("Obtención de examen completada")
    });

    //listamos las categorias y las guardamos en nuestra variable para 
    //utilizarla en el html en su combobox respectivo
    this.categoriaService.listarCategorias().subscribe({
      next:(data:any) => {
        this.categorias = data;
      },
      error:(error) => {
        alert("Error al cargar las categorías");
      },
      complete:() => console.log("Listar categorías en actualizar examen completo")
    });
  }
  
  public actualizarDatos(){
    this.examenService.actualizarExamen(this.examen).subscribe({
      next: (data) => {
        Swal.fire("Examen actualizado","El examen se ha actualizado correctamente","success");
      },
      error:(error) =>{
        Swal.fire("Error en el sistema","El examen no se ha podido actualizar","error");
        console.log(error);
      },
      complete: () => this.router.navigate(['/admin/examenes'])
    });
  }

}
