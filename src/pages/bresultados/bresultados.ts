import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {Pipe} from '@angular/core';
import { ActionSheetController } from 'ionic-angular'
import { EmailComposer } from '@ionic-native/email-composer';
import { DatabaseProvider } from '../../providers/database/database';
import * as papa from 'papaparse';
//import { Http } from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FileOpener } from '@ionic-native/file-opener';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;





@IonicPage()
@Component({
  selector: 'page-bresultados',
  templateUrl: 'bresultados.html',
})
@Pipe({name: 'round'})
export class BresultadosPage {

  



  dirPath;
  arrayMatMamp: any;
  material = {};
  headerArrayMatMamp: any[] = [];
  pdfObj = null;
  //public descripcion: any;
  public Altura = this.navParams.get('altura');
  public Base = this.navParams.get('base');
  public mampMaterials0 = this.navParams.get('espesor');
  public Bloques = this.navParams.get('tipoBloque');
  public Area = this.Base * this.Altura;






  constructor(
      public navCtrl: NavController,
      public actionSheetCtrl: ActionSheetController,
      public navParams: NavParams,
      private emailComposer: EmailComposer,
      private database:DatabaseProvider,
      private transfer: FileTransfer,
      private plt: Platform,
      private fileOpener: FileOpener,
      private file: File ) {

      

    console.log(this.navParams.get('base'));
    console.log(this.navParams.get('altura'));
    console.log(this.navParams.get('tipoBloque'));
    console.log(this.navParams.get('espesor'));
  }
  fileTransfer: FileTransferObject = this.transfer.create();


  ngOnInit(): void {
     
  }
  


      ionViewDidLoad() {
        let  Altura = this.navParams.get('altura');
        let Base = this.navParams.get('base');
        let mampMaterials0 = this.navParams.get('espesor');
        let Bloques = this.navParams.get('tipoBloque');
        let Area = this.Base * this.Altura;
        console.log(this.navParams.get('base'));
        console.log(this.navParams.get('altura'));
        console.log(this.navParams.get('tipoBloque'));
        console.log(this.navParams.get('espesor'));

   
        this.database.createMaterilas( JSON.stringify(this.mampMaterials0[0].Cant), this.mampMaterials0[0].description, JSON.stringify(this.mampMaterials0[0].ud), JSON.stringify(this.mampMaterials0), this.Base , this.Altura).then ( (data) =>{
         //this.ionViewDidLoad()
          console.log(data);
        },  (error) => {
          console.log(error);
        })
       this.material = {};

       this.getdata();

       
      }

      ionViewDidLeave(){
         this.deletematerials(1);
         this.deletematerials(2);
         this.deletematerials(3);
         this.deletematerials(4);
         this.deletematerials(5);
         this.deletematerials(6);
         this.deletematerials(7);
         this.deletematerials(8);
         this.deletematerials(9);
         this.deletematerials(10);
         this.deletematerials(11);
         this.deletematerials(12);
         this.deletematerials(13);
         this.deletematerials(14);
         this.deletematerials(15);
         this.deletematerials(16);
         this.deletematerials(17);
         this.deletematerials(18);

         console.log(this.arrayMatMamp);
      }
    
    getdata(){  
        this.database.getMaterials().then(data =>{
          this.arrayMatMamp = data;
         // this.adonis = this.arrayMatMamp.JSON.stringify(this.arrayMatMamp[this.arrayMatMamp.length - 1]);
          console.log(this.arrayMatMamp[this.arrayMatMamp.length - 1]);
          console.log(this.arrayMatMamp[this.arrayMatMamp.length - 1].description);
          console.log(this.arrayMatMamp[this.arrayMatMamp.length - 1].amount);
          console.log(this.arrayMatMamp[this.arrayMatMamp.length - 1].id);
          console.log(this.arrayMatMamp[this.arrayMatMamp.length - 1].ud)
          console.log(this.arrayMatMamp[this.arrayMatMamp.length - 1].Base)
          console.log(this.arrayMatMamp[this.arrayMatMamp.length - 1].Altura)
          console.log(this.arrayMatMamp);
          let headerArrayMatMamp = this.arrayMatMamp[0]
  
        });
      }

      deletematerials(rowid){
        this.database.delete(rowid)
        .then(response => {
          console.log( response );
       //   this.arrayMatMamp.splice(i, 0);
        })
        .catch( error => {
          console.error( error );
        })
      }

    //  SaveDate(){

        SaveDate() {
          let actionSheet = this.actionSheetCtrl.create({
            title: 'Guardar en:',
            buttons: [
              {
                text: 'Excel',
                role: 'Excel',
                handler: () => {
                    // sub button excel
                  console.log('Destructive clicked');
                              // parse csv data to json
                    let csvData = papa.unparse([
                      {
                        description: this.arrayMatMamp[this.arrayMatMamp.length - 1].description
                      }
                    ]);
                    console.log(csvData);
                    // create path to send file 
                    let result = this.file.createDir( this.file.externalRootDirectory, 'IngetdMaterials', true  );

                    result.then( data => {
                      this.dirPath = data.toURL();
                        alert("Dirctorio Creado en " + this.dirPath);
                    // Send file 
                        this.file.writeFile(this.dirPath, 'csvData.xls', csvData, {replace: true});
                        alert("Archivo creado en" + this.dirPath)
                    }).catch( error => {
                      console.log("download error source " + error.source);
                      console.log("download error target " + error.target);
                      console.log("download error code" + error.code);
                    });

                    let url = 'cdvfile://localhost/persistent/path/to/downloads/';
                    this.fileTransfer.download(url, this.file.externalRootDirectory + 'Ingted Materiales').then((entry) => {
                      console.log('download complete: ' + entry.toURL());
                    }, (error) => {
                      console.log("download error source " + error.source);
                      console.log("download error target " + error.target);
                      console.log("download error code" + error.code);
                    });
                }
              },
              {
                text: 'PDF',
                handler: () => {
                  // PDF Creator => 
                  let csvData = papa.unparse([
                    {
                      description: this.arrayMatMamp[this.arrayMatMamp.length - 1].description
                    }
                  ]);
                    var docDefinition = {
                      content: [
                        { text: 'LISTA DE MATERIALES', style: 'header' },
                        { text: new Date().toTimeString(), alignment: 'right' },
                 
                        { text: 'From', style: 'subheader' },
                        { text: csvData },
                 
                        { text: 'To', style: 'subheader' },
                        csvData,
                 
                        { text: csvData, style: 'story', margin: [0, 20, 0, 20] },
                        {
                          ul: [
                            'Bacon',
                            'Rips',
                            'BBQ',
                          ]
                        }
                      ],
                      styles: {
                        header: {
                          fontSize: 18,
                          bold: true,
                        },
                        subheader: {
                          fontSize: 14,
                          bold: true,
                          margin: [0, 15, 0, 0]
                        },
                        story: {
                          italic: true,
                          alignment: 'center',
                          width: '50%',
                        }
                       }
                      }
                      // Dowloader Pdf
                      this.pdfObj = pdfMake.createPdf(docDefinition);
                      if (this.plt.is('cordova')) {
                        this.pdfObj.getBuffer((buffer) => {
                          var blob = new Blob([buffer], { type: 'application/pdf' });
                   
                          // Save the PDF to the data Directory of our App
                          this.file.writeFile(this.file.externalRootDirectory, 'myletter.pdf', blob, { replace: true }).then(fileEntry => {
                            console.log('download complete: ' + fileEntry.toURL());
                             // Open the PDf with the correct OS tools
                            this.fileOpener.open(this.file.externalRootDirectory + 'myletter.pdf', 'application/pdf');
                          }, (error) => {
                            console.log("download error source " + error.source);
                            console.log("download error target " + error.target);
                            console.log("download error code" + error.code);
                           
                          })
                        });
                      } else {
                        // On a browser simply use download!
                        this.pdfObj.download();
                      }

                  // end PDF creator <=
                  console.log('Archive clicked');
                  }
                
              },
              {
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  console.log('Cancel clicked');
                }
              }
            ],
          });
       
          actionSheet.present();
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
    
    





   /* if (this.mampMaterials0 == 0.039) {
      
      this.mampMaterials0 = [
        
                {Cant: 12.875, description: 'Bloques de 0.20 mts (8")', ud: 'ud'},
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
        

    } if (this.mampMaterials0 == 0.031) {

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

      
    } if (this.mampMaterials0 == 0.029) {

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

    /*      this.database.createMaterilas( JSON.stringify(this.mampMaterials0[0].Cant), JSON.stringify(this.mampMaterials0[0].description ), JSON.stringify(this.mampMaterials0[0].ud), JSON.stringify(this.mampMaterials0[0].Cant) ).then ( (data) =>{
            this.getData()
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
          });    */
        }
