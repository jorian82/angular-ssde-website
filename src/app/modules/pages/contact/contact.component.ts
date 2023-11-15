import { Component } from '@angular/core';

interface Contacto {
  imagen: string;
  etiqueta: string;
  texto: string[];
  color: string;
}

const contactos: Contacto[] = [
  {
    imagen: 'cellphone', etiqueta: 'Teléfono', texto: ['+5233 2773 1504', '+5233 2226 1517'], color: 'font-purple'
  },
  {
    imagen: 'envelope', etiqueta: 'Correo', texto: ['jorge.rivera@ssde.com.mx', 'contacto@ssde.com.mx'], color: 'font-blue'
  },
  {
    imagen: 'message', etiqueta: 'Mesaje de texto', texto: ['+5233 2773 1504', '+5233 2226 1517'], color: 'font-red'
  },
  {
    imagen: 'whatsapp', etiqueta: 'Whatsapp', texto: ['+5233 2773 1504', '+5233 2226 1517'], color: 'font-green'
  }
]

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss','../../app.component.scss']
})
export class ContactComponent {
  itemList: Contacto[] = contactos;
}
