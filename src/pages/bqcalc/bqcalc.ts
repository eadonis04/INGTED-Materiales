import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController} from 'ionic-angular';
import { BresultadosPage } from '../bresultados/bresultados';
import { AlertController } from 'ionic-angular';
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

  
  

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public viewCtrl: ViewController) {
    
     
  }
  radioValueButton(){
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
   // let bloquesValue2: string = this.V_bloques;
    //return bloquesValue2 ;

    
   // let bloquesValue: number = this.M_radioValue;
    
    //return this.bloquesValue2;
    //console.log(V_bloques);
    //console.log(bloquesValue);
    //console.log(bloquesValue2);

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
      espesor :this.M_radioValue})

      modalMamResut.onDidDismiss(() => {
        
            });

    modalMamResut.present();
      
            
    
    }
}
 
  
    
      //this.viewCtrl.dismiss(altura_value);
  }
    
  //}

  /*this.valueBase;
    let altura_value = this.valueAltura;
    console.log(base_value);
    console.log(altura_value);
    console.log(altura_value * base_value);


    this.navCtrl.push( BresultadosPage, altura_value );*/