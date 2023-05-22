import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'idToTeamName' })
export class TransformTeamDataPipe implements PipeTransform {
    transform(teamId: number) {
        switch (teamId) {
            case 1403:
              return 'Heracles';
              break;
            case 1128:
              return 'ADO Den Haag';
            case 669:
              return 'Willem II';
              break;
            case 1016:
              return 'PEC Zwolle';
              break;
            case 2344:
              return 'Roda JC';
              break;
            case 2385:
              return 'FC Den Bosch';
              break;
          case 2755:
            return 'Jong Utrecht';
            break;
            case 2971:
              return 'Jong PSV';
              break;
            case 2783:
              return 'Jong Ajax';
              break;
            case 3115:
              return 'Jong AZ';
              break;
            case 1731:
              return 'MVV Maastricht';
              break;
            case 1550:
              return 'Telstar';
              break;
            case 2460:
              return 'Helmond Sport';
              break;
            case 1550:
              return 'Telstar';
              break;
            case 320:
              return 'FC Eindhoven';
              break;
            case 637:
              return 'NAC Breda';
              break;
            case 2379:
              return 'VVV Venlo';
              break;
            case 2360:
              return 'Top Oss';
              break;
            case 1433:
              return 'Almere City';
              break;
            case 1073:
              return 'De Graafschap';
              break;
          case 822:
            return 'FC Dordrecht';
            break;
              default:
        }
    }
}
