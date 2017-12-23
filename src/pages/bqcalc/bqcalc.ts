import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController} from 'ionic-angular';
import { BresultadosPage } from '../bresultados/bresultados';
import { AlertController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database'
/**
 * Generated class for the BqcalcPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-bqcalc',
  templateUrl: 'bqcalc.html',
})
export class BqcalcPage {
  
  public MamBloques = [];
  mampMaterials0: any[] = [];
  arrayMatMamp:any; 
  material = {};
   
  



  // Select Mamposteria Value

  valueBase: number;
  valueAltura: number;
  base = this.valueBase;
  altura = this.valueAltura;

  
  //Radio Mamposteria Value

  visible: boolean;
  view = this.visible;
  M_radioValue: number;
  espesor = this.M_radioValue;
  V_bloques: string;
  value : number;
  text: string;
 // tipoBloque = this.V_bloques;

  
  

  constructor(private database:DatabaseProvider, public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public viewCtrl: ViewController) {
    
     
  }

    
//Valores radio Button 
mamType: any[];
//M_radioValue: any;

ngOnInit(): void {
  this.mamType = [
  
      {value: 0.029, text: 'bloques de 0.10 mts (4")'},
      {value: 0.031, text: 'bloques de 0.15 mts (6")'},
      {value: 0.039, text: 'bloques de 0.20 mts (8")'}
  ];

  //this.M_radioValue = "block4";
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad BqcalcPage');
    //console.log(this.M_radioValue);
    console.log(this.mamType[0].value);


  }

  mcqAnswer(M_radioValue){
    console.log(this.M_radioValue);
    

    if (this.M_radioValue == 0.039) {
      
      this.mampMaterials0 = [
        
                {Cant: 12.875, description: `Bloques de 0.20 mts (8")`, ud: 'ud'},
                {Cant: 0.055, description: 'Acero 3/8" x 20 G60', ud: 'qq'},
                {Cant: 0.089, description: 'Hormigón 140 KG/cms2 (1:3:5 a mano)', ud:'m3'},
                {Cant: 0.076, description: 'Grava Triturada de 3/4"', ud: 'm3' },
                {Cant: 0.046, description: 'Arena Gruesa Lavada o Triturada', ud: 'm3' },
                {Cant: 0.039, description: 'Arena gruesa ITABO (de mina para Mortero)', ud: 'm3' },
                {Cant: 1.02, description: 'Cemento gris tipo Portland', ud: 'fda' },
                {Cant: 0.11, description: 'Alambre dulce #18', ud: 'qq'},
                {Cant: 8.03, description: 'Agua', Ud:'gal'},
                {Cant: 0.039, description: 'Mortero 1:3 en juntas', Ud:'m3'},
            ];
        

    } if (this.M_radioValue == 0.031) {

      this.mampMaterials0 = [
        
                {Cant: 12.875, description: `Bloques de 0.15 mts (6")`, ud: 'ud'},
                {Cant: 0.055, description: 'Acero 3/8" x 20 G60', ud: 'qq'},
                {Cant: 0.024, description: 'Hormigón 140 KG/cms2 (1:3:5 a mano)', ud:'m3'},
                {Cant: 0.02, description: 'Grava Triturada de 3/4"', ud: 'm3' },
                {Cant: 0.012, description: 'Arena Gruesa Lavada o Triturada', ud: 'm3' },
                {Cant: 0.029, description: 'Arena gruesa ITABO (de mina para Mortero)', ud: 'm3' },
                {Cant: 0.50, description: 'Cemento gris tipo Portland', ud: 'fda' },
                {Cant: 0.11, description: 'Alambre dulce #18'},
                {Cant: 3.44, description: 'Agua',ud:'gal'},
                {Cant: 0.031, description: 'Mortero 1:3 en juntas', Ud:'m3'},
              ];

      
    } if (this.M_radioValue == 0.029) {

     this.mampMaterials0 = [
        
                {Cant: 12.875, description: `Bloques de 0.10 mts (4")`, ud: 'ud'},
                {Cant: 0.055, description: 'Acero 3/8" x 20 G60', ud: 'qq'},
                {Cant: 0.020, description: 'Hormigón 140 KG/cms2 (1:3:5 a mano)', ud:'m3'},
                {Cant: 0.017, description: 'Grava Triturada de 3/4"', ud: 'm3' },
                {Cant: 0.010, description: 'Arena Gruesa Lavada o Triturada', ud: 'm3' },
                {Cant: 0.021, description: 'Arena gruesa ITABO (de mina para Mortero)', ud: 'm3' },
                {Cant: 0.37, description: 'Cemento gris tipo Portland', ud: 'fda' },
                {Cant: 0.11, description: 'Alambre dulce #18'},
                {Cant: 2.65, description: 'Agua',ud:'gal'},
                {Cant: 0.029, description: 'Mortero 1:3 en juntas', ud:'m3'},
            ];
          }
          console.log(this.mampMaterials0);
    }


    calc_mamposteria(){    
    
if ( this.valueAltura == null || this.valueAltura == 0 || this.valueBase == null || this.valueBase == 0 || this.M_radioValue == null  ) {

    let alert = this.alertCtrl.create({
      title: 'Importante!',
      subTitle: 'Recuerda suministrar los datos necesaria para completar la informacion!',
      buttons: ['OK']
    });
    alert.present();
  }
 else
  {
    let modalMamResut = this.modalCtrl.create(BresultadosPage, {
      base: this.valueBase,
      altura: this.valueAltura,
      tipoBloque: this.mamType,
      espesor :this.mampMaterials0})

      modalMamResut.onDidDismiss(() => {
        
            })
    modalMamResut.present();
    }


    /*this.database.createMaterilas( JSON.stringify(this.mampMaterials0[0].Cant), JSON.stringify(this.mampMaterials0[0].description ), JSON.stringify(this.mampMaterials0[0].ud), JSON.stringify(this.mampMaterials0[0].Cant) ).then ( (data) =>{
      this.calc_mamposteria()
       //console.log(data);
     },  (error) => {
       console.log(error);
     })
    this.material = {};

    this.database.getMaterials().then(data =>{
      this.arrayMatMamp = data;
      console.log(this.arrayMatMamp[this.arrayMatMamp.length - 1]);
      console.log(this.arrayMatMamp[this.arrayMatMamp.length - 1].description);
      console.log(this.arrayMatMamp[this.arrayMatMamp.length - 1].amount);
      console.log(this.arrayMatMamp[this.arrayMatMamp.length - 1].id);
      console.log(this.arrayMatMamp[this.arrayMatMamp.length - 1].ud);
      //let descripcion = this.arrayMatMamp[this.arrayMatMamp.length - 1].description;
      //console.log(this.descripcion); 
    });    
    */
      }
    }
  //}

  /*this.valueBase;
    let altura_value = this.valueAltura;
    console.log(base_value);
    console.log(altura_value);
    console.log(altura_value * base_value);


    this.navCtrl.push( BresultadosPage, altura_value );*/