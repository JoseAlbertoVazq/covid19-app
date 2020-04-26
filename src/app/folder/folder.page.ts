import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Covid19Service } from '../services/covid19.service';
import { Country } from "../interfaces/country";
import { World } from "../interfaces/world";
@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  public title: string = null;
  public worldData: World = null;
  public countryData: Country[] = null;
  rangeActive: number = 0;
  rangeDeaths: number = 0;
  rangeRecovered: number = 0;
  rangeConfirmed: number = 0;

  constructor(private activatedRoute: ActivatedRoute, private covid: Covid19Service) { }

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.folder == "spain" ? this.title = "Datos de España" : this.title = "Datos globales";
    this.getCountryData("spain");
    this.getWorldData();
  }

  getWorldData() {
    this.covid.getWorldLiveData().subscribe(data => {
      this.worldData = data;
    });
  }

  getCountryData(country: string) {
    this.covid.getLiveByContryAllStatus(country).subscribe(data => {
      this.countryData = data;
      console.log(this.countryData[this.countryData.length - 1]);
      this.getRange(data);
    });
  }

  getRange(data: any) {
    this.rangeConfirmed = data[data.length-1].Confirmed - data[data.length-2].Confirmed;
    this.rangeActive = data[data.length-1].Active - data[data.length-2].Active;
    this.rangeDeaths = data[data.length-1].Deaths - data[data.length-2].Deaths;
    this.rangeRecovered = data[data.length-1].Recovered - data[data.length-2].Recovered;
  }
}
