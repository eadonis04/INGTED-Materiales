import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Pipe} from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer';
import { DatabaseProvider } from '../../providers/database/database'




@IonicPage()
@Component({
  selector: 'page-bresultados',
  templateUrl: 'bresultados.html',
})
@Pipe({name: 'round'})
export class BresultadosPage {

  





  public Altura = this.navParams.get('altura');
  public Base = this.navParams.get('base');
  public Espesor= this.navParams.get('espesor');
  public Bloques = this.navParams.get('tipoBloque');
  public Area = this.Base * this.Altura;





  constructor(public navCtrl: NavController, public navParams: NavParams, private emailComposer: EmailComposer, private database: DatabaseProvider ) {
    console.log(this.navParams.get('base'));
    console.log(this.navParams.get('altura'));
    console.log(this.navParams.get('tipoBloque'));


    
    
    //let Bloques = navParams.get('typeBlo');
    //console.log(this.Bloques)
  }
  mampMaterials0: any[];

  ngOnInit(): void {
    if (this.Espesor == 0.039) {
      
      this.mampMaterials0 = [
        
                {Cant: this.Area*12.875, description: 'Bloques de 0.20 mts (8")', ud: 'ud'},
                {Cant: this.Area*0.055, description: 'Acero 3/8" x 20 G60', ud: 'qq'},
                {Cant: this.Area*0.089, description: 'Hormigón 140 KG/cms2 (1:3:5 a mano)', ud:'m3'},
                {Cant: this.Area*0.076, description: 'Grava Triturada de 3/4"', ud: 'm3' },
                {Cant: this.Area*0.046, description: 'Arena Gruesa Lavada o Triturada', ud: 'm3' },
                {Cant: this.Area*0.039, description: 'Arena gruesa ITABO (de mina para Mortero)', ud: 'm3' },
                {Cant: this.Area*1.02, description: 'Cemento gris tipo Portland', ud: 'fda' },
                {Cant: this.Area*0.11, description: 'Alambre dulce #18', ud: 'qq'},
                {Cant: this.Area*8.03, description: 'Agua', Ud:'gal'},
                {Cant: this.Area*0.039, description: 'Mortero 1:3 en juntas', Ud:'m3'},
            ];
        

    } if (this.Espesor == 0.031) {

      this.mampMaterials0 = [
        
                {Cant: this.Area*12.875, description: 'Bloques de 0.15 mts (6")', ud: 'ud'},
                {Cant: this.Area*0.055, description: 'Acero 3/8" x 20 G60', ud: 'qq'},
                {Cant: this.Area*0.024, description: 'Hormigón 140 KG/cms2 (1:3:5 a mano)', ud:'m3'},
                {Cant: this.Area*0.02, description: 'Grava Triturada de 3/4"', ud: 'm3' },
                {Cant: this.Area*0.012, description: 'Arena Gruesa Lavada o Triturada', ud: 'm3' },
                {Cant: this.Area*0.029, description: 'Arena gruesa ITABO (de mina para Mortero)', ud: 'm3' },
                {Cant: this.Area*0.50, description: 'Cemento gris tipo Portland', ud: 'fda' },
                {Cant: this.Area*0.11, description: 'Alambre dulce #18'},
                {Cant: this.Area*3.44, description: 'Agua',ud:'gal'},
                {Cant: this.Area*0.031, description: 'Mortero 1:3 en juntas', Ud:'m3'},
              ];

      
    } if (this.Espesor == 0.029) {

     this.mampMaterials0 = [
        
                {Cant: this.Area*12.875, description: 'Bloques de 0.15 mts (6")', ud: 'ud'},
                {Cant: this.Area*0.055, description: 'Acero 3/8" x 20 G60', ud: 'qq'},
                {Cant: this.Area*0.020, description: 'Hormigón 140 KG/cms2 (1:3:5 a mano)', ud:'m3'},
                {Cant: this.Area*0.017, description: 'Grava Triturada de 3/4"', ud: 'm3' },
                {Cant: this.Area*0.010, description: 'Arena Gruesa Lavada o Triturada', ud: 'm3' },
                {Cant: this.Area*0.021, description: 'Arena gruesa ITABO (de mina para Mortero)', ud: 'm3' },
                {Cant: this.Area*0.37, description: 'Cemento gris tipo Portland', ud: 'fda' },
                {Cant: this.Area*0.11, description: 'Alambre dulce #18'},
                {Cant: this.Area*2.65, description: 'Agua',ud:'gal'},
                {Cant: this.Area*0.029, description: 'Mortero 1:3 en juntas', Ud:'m3'},
            ];
          }
  }

  /*CantRound(d,e){

    let a = this.Area;
    let b = this.mampMaterials0[0].Cant
    let c = Math.floor( a * b );
    return c ;
      }*/

  ionViewDidLoad() {
      
    console.log(this.mampMaterials0)

  }


  SendDateEmail(){
    let email = {
      to: 'e_adonis04@hotmail.com',
      cc: 'eadonis04@gamil.com',
      attachments: [
        this.Altura
      ],
      subject: 'Hola',
      body: 'Hola otra ves',
      isHTML: true
    };
    this.emailComposer.open(email);

    }


  
  
}


