import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Router } from '@angular/router';
import { SpacexService } from '../../services/spacex.service';
import { Mission } from '../../models/mission';
import { MissionfilterComponent } from '../missionfilter/missionfilter.component';

@Component({
  standalone: true,
  selector: 'app-missionlist',
  imports: [CommonModule, MatCardModule, MatButtonModule, RouterModule, MissionfilterComponent],
  templateUrl: './missionlist.component.html',
  styleUrls: ['./missionlist.component.css']
})
export class MissionlistComponent implements OnInit {
  missions: Mission[] = [];
  filteredMissions: Mission[] = [];
  originalMissions: Mission[] = [];
  activeFilters: any = {
    year: null,
    launchSuccess: null,
    landSuccess: null
  };

  constructor(private spacexService: SpacexService, private router: Router) {}

  ngOnInit(): void {
    this.loadAllMissions();
  }

  loadAllMissions(): void {
    this.spacexService.getMissions().subscribe(data => {
      this.missions = data;
      this.filteredMissions = [...data];
      this.originalMissions = [...data];
    });
  }

  applyFilters(): void {
    this.filteredMissions = [...this.originalMissions];
    
    if (this.activeFilters.year) {
      this.filteredMissions = this.filteredMissions.filter(
        mission => mission.launch_year === this.activeFilters.year
      );
    }
    
    if (this.activeFilters.launchSuccess !== null) {
      this.filteredMissions = this.filteredMissions.filter(
        mission => mission.launch_success === (this.activeFilters.launchSuccess === 'true')
      );
    }
    
    if (this.activeFilters.landSuccess !== null) {
      this.filteredMissions = this.filteredMissions.filter(mission => {
        // Check the first core's land_success status
        const firstCore = mission.rocket?.first_stage?.cores?.[0];
        if (firstCore) {
          return firstCore.land_success === (this.activeFilters.landSuccess === 'true');
        }
        return false; // or true if you want to include missions with no landing data
      });
    }
  }

  filterMissions(year: string): void {
    this.activeFilters.year = year;
    this.applyFilters();
  }

  filterByLaunchSuccess(value: string): void {
    this.activeFilters.launchSuccess = value;
    this.applyFilters();
  }

  filterByLandSuccess(value: string): void {
    this.activeFilters.landSuccess = value;
    this.applyFilters();
  }

  resetFilters(): void {
    this.activeFilters = {
      year: null,
      launchSuccess: null,
      landSuccess: null
    };
    this.filteredMissions = [...this.originalMissions];
  }

  goToDetails(id: number): void {
    this.router.navigate(['/mission', id]);
  }

  // Helper method to display landing status in the template
  getLandingStatus(mission: Mission): string {
    const firstCore = mission.rocket?.first_stage?.cores?.[0];
    if (!firstCore || firstCore.land_success === null) {
      return 'N/A';
    }
    return firstCore.land_success ? 'Success' : 'Failed';
  }
}