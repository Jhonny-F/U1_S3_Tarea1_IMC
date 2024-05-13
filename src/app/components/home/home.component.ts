import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

export interface Usuario {
  imagen: string
  nombre: string
  apellido: string
  peso: number
  altura: number
  informe?: string
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styles: ``
})
export default class HomeComponent {

  usuario!: Usuario | null
  form: FormGroup

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      imagen: ['', Validators.required],
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      peso: ['', Validators.required],
      altura: ['', Validators.required]
    })
  }

  calcular() {
    if (this.form.invalid) return
    const { imagen, nombre, apellido, peso, altura } = this.form.value
    const filename = imagen.split('\\').pop() || imagen
    const usuario: Usuario = { imagen: filename, nombre, apellido, peso, altura }
    this.calcularIMC(usuario)
    this.usuario = usuario
    this.form.reset()
  }

  calcularIMC(usuario: Usuario) {
    const alturaM = usuario.altura / 100 
    const imc = usuario.peso / (alturaM * alturaM)
    const estado = this.obtenerEstadoPeso(imc)
    usuario.informe = `${usuario.nombre} ${usuario.apellido} tiene un IMC de ${imc.toFixed(2)}, lo que indica un estado de ${estado}.`
  }

  obtenerEstadoPeso(imc: number): string {
    if (imc < 18.5) return "Bajo peso"
    if (imc < 25) return "Peso normal"
    if (imc < 30) return "Sobrepeso"
    return "Obesidad"
  }

  limpiar(){
    this.usuario = null
  }

}
