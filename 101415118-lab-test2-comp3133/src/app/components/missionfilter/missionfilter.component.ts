import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-missionfilter',
  imports: [CommonModule, MatButtonModule, MatSelectModule, FormsModule],
  templateUrl: './missionfilter.component.html',
  styleUrls: ['./missionfilter.component.css']
})
export class MissionfilterComponent {
  @Output() filterYear = new EventEmitter<string>();
  @Output() filterLaunchSuccess = new EventEmitter<string>();
  @Output() filterLandSuccess = new EventEmitter<string>();
  @Output() resetFilters = new EventEmitter<void>();

  selectedYear: string = '';
  selectedLaunchSuccess: string = '';
  selectedLandSuccess: string = '';

  years = [
    '2006', '2007', '2008', '2009', '2010',
    '2011', '2012', '2013', '2014', '2015',
    '2016', '2017', '2018', '2019', '2020'
  ];

  successOptions = [
    { value: 'true', label: 'Success' },
    { value: 'false', label: 'Failure' }
  ];

  applyYear(): void {
    this.filterYear.emit(this.selectedYear);
  }

  applyLaunchSuccess(): void {
    this.filterLaunchSuccess.emit(this.selectedLaunchSuccess);
  }

  applyLandSuccess(): void {
    this.filterLandSuccess.emit(this.selectedLandSuccess);
  }

  onReset(): void {
    this.selectedYear = '';
    this.selectedLaunchSuccess = '';
    this.selectedLandSuccess = '';
    this.resetFilters.emit();
  }
}