import { DatePipe } from '@angular/common';
import { AfterViewChecked, ChangeDetectorRef, Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe]
})

export class AppComponent implements AfterViewChecked {

  notesData: Note[]; notesLabelsMetaData: NoteLabel[];
  selectedWeek: number = 1; visibleDates: Date[] = [];
  dataSource = []; loadingIndicator: boolean = false;
  editingCard: any = { title: '', summary: '', startDate: new Date(), endDate: new Date(), labels: [], duration: 0, id: null };
  constructor(
    private service: AppService, private cd: ChangeDetectorRef, private datePipe: DatePipe,
    private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getNotes();
  }

  ngAfterViewChecked() {
    this.cd.detectChanges();
  }

  // to call notesmetadata & notes apis
  async getNotes() {
    // this.loadingIndicator = true;
    // await this.service.getNoteLabes().toPromise().then((res: any) => {
    //   this.notesLabelsMetaData = res;
    // }, error => {
    //   this.snackBar.open('System is not available at the moment. please backend service', 'Okay!', {
    //     duration: 3000
    //   });
    //   this.loadingIndicator = false;
    // });
    // this.service.getNotes().subscribe((res: any) => {
    //   this.notesData = res.notes;
    //   this.notesData.forEach(note => { // changing dates from unix format to date format
    //     note.startDate = this.setDatesConsistency(note.startDate);
    //     note.endDate = this.setDatesConsistency(note.endDate);
    //   });
    //   this.setDatesBasedOnWeek(this.selectedWeek);
    //   // this.loadingIndicator = false;
    // }, error => {
    //   this.snackBar.open('System is not available at the moment. please check backend service', 'Okay!', {
    //     duration: 3000
    //   });
    //   this.loadingIndicator = false;
    // });
    this.notesLabelsMetaData = [{ id: 1, text: 'Frontend' }, { id: 2, text: 'Backend' }, { id: 3, text: 'Security' }];
    this.notesData = [{"id":1,"title":"Quick try on DB","startDate":1641164400,"endDate":1641164400,"labels":[1,3],"summary":"One morning, when Gregor Samsa woke from troubled dreams."},{"id":2,"title":"Dirty check","startDate":1641250800,"endDate":1641250800,"labels":[2],"summary":"MTV"},{"id":3,"title":"Fix a the bug","startDate":1641250800,"endDate":1641337200,"labels":[2],"summary":"DJs flock by when MTV ax quiz"},{"id":4,"title":"Improve backend","startDate":1641337200,"endDate":1641337200,"labels":[1,2],"summary":"totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vit"},{"id":5,"title":"Add chat feature","startDate":1641337200,"endDate":1641423600,"labels":[3],"summary":"One morning,"},{"id":6,"title":"Improve submodule","startDate":1641337200,"endDate":1641337200,"labels":[3],"summary":"he quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog"},{"id":7,"title":"Extend calendar","startDate":1641510000,"endDate":1641510000,"labels":[1,2],"summary":"A collection of textile samples"},{"id":8,"title":"Friends check","startDate":1641510000,"endDate":1641510000,"labels":[1,3],"summary":"Gregor then turned to look out the window at the dull weather. Drops of rain could be heard hitting the pane, which made him feel quite sad."},{"id":9,"title":"Write some code","startDate":1641769200,"endDate":1641942000,"labels":[1],"summary":"Far far away, behind the word mountains,"},{"id":10,"title":"YAML really?","startDate":1641855600,"endDate":1641855600,"labels":[1,3],"summary":"Separated they live in Bookmarksgrove right at the coast o"},{"id":11,"title":"Get together","startDate":1641942000,"endDate":1641942000,"labels":[2],"summary":"he quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog"},{"id":12,"title":"Extend mid module","startDate":1641942000,"endDate":1641942000,"labels":[2,3],"summary":"Separated they live in Bookmarksgrove"},{"id":13,"title":"Optimize start","startDate":1641942000,"endDate":1641942000,"labels":[2,3],"summary":"Gregor then turned to look out the window at the dull weather. Drops of rain could be heard hitting the pane, which made him feel quite sad."},{"id":14,"title":"Optimize end","startDate":1642028400,"endDate":1642374000,"labels":[2],"summary":"His room, a proper human room although a little too small, lay peacefully between its four familiar walls"},{"id":15,"title":"Buy a cake","startDate":1642114800,"endDate":1642114800,"labels":[2,3],"summary":"Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar."},{"id":101,"title":"Options","startDate":1642114800,"endDate":1642114800,"labels":[1],"summary":"The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps."},{"id":17,"title":"Blind Geme","startDate":1642460400,"endDate":1642460400,"labels":[2],"summary":"One morning,"},{"id":18,"title":"Extend Entry module","startDate":1642460400,"endDate":1642460400,"labels":[2],"summary":"DJs flock by when MTV ax quiz"},{"id":19,"title":"Order drinks","startDate":1642460400,"endDate":1642633200,"labels":[3],"summary":"The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps. Bawds jog, flick quartz, vex nymphs. Waltz, bad nymph, for quick jigs vex! Fox nymphs grab quick-jived waltz. Brick quiz whangs jumpy."},{"id":20,"title":"Celebrate something","startDate":1642633200,"endDate":1642633200,"labels":[1,2,3],"summary":"The quick, brown fox jumps over a lazy dog. DJs flock by when MTV ax quiz prog. Junk MTV quiz graced by fox whelps."},{"id":21,"title":"End up","startDate":1642719600,"endDate":1642719600,"labels":[2],"summary":"A collection of textile samples"}];
    this.notesData.forEach(note => {
      note.startDate = this.setDatesConsistency(note.startDate);
      note.endDate = this.setDatesConsistency(note.endDate);
    });
    this.setDatesBasedOnWeek(this.selectedWeek);
  }

  // returns dummy array of mentioned size
  getDummyArray(arraySize) {
    return Array(arraySize).fill(0);
  }

  // returns the labels (frontend, backend & security) which are visible i.e. unfiltered
  getVisibleLabels() {
    return this.dataSource.filter(x => x.visible).map(x => x.labelName);
  }

  // returns the dateObj in string in mentioned format
  getDateInFormat(dateObj: Date) {
    return this.datePipe.transform(dateObj, 'yyyy-MM-dd');
  }

  // sets date in consistent manner and returns the time
  setDatesConsistency(datetime): number {
    const date = new Date(datetime * 1000);
    date.setHours(0, 0, 0, 0);
    return date.getTime();
  }

  // sets the 5 visible dates(excluding weekends) based on week number
  setDatesBasedOnWeek(weekNum) {
    this.visibleDates = [];
    const date = (1 + (weekNum - 1) * 7)
    const sDate = new Date(new Date().getFullYear(), 0, date - 1);
    for (let i = 1; i <= 7; i++) {
      const futureDate = new Date(sDate.getTime() + i * 24 * 60 * 60 * 1000);
      if (!this.isDateWeekend(futureDate)) {
        this.visibleDates.push(futureDate);
      }
    }
    this.prepareDataBasedOnDates();
  }

  // returns if the date is weekend or not
  isDateWeekend(date: Date): boolean {
    if (date.getDay() === 6 || date.getDay() === 0) {
      return true;
    }
    return false;
  }

  // based on the selected week, prepares the dataSource to be displayed on UI
  prepareDataBasedOnDates() {
    this.dataSource = [];
    this.notesLabelsMetaData.forEach(label => {
      const respectiveNotes: Note[] = this.notesData.filter(x => x.labels.includes(label.id))
        .filter(x => new Date(x.startDate) >= this.visibleDates[0] ||
          new Date(x.endDate) >= this.visibleDates[0]);
      this.dataSource.push(
        {
          label: label.id,
          labelName: label.text,
          visible: true, // used to filter the labels
          data: respectiveNotes
        }
      )
    });
  }

  // hides/shows the labels(frontend, backend & security)
  toggleVisiblity(labelName) {
    let dataObj = this.dataSource.find(x => x.labelName === labelName);
    dataObj.visible = !dataObj.visible;
  }

  // called when week is incremented/decremented
  changeWeek(changeType) {
    if (changeType === 'increment') {
      this.selectedWeek += 1;
      this.setDatesBasedOnWeek(this.selectedWeek);
    } else {
      if (this.selectedWeek > 1) {
        this.selectedWeek -= 1;
        this.setDatesBasedOnWeek(this.selectedWeek);
      }
    }
  }

  // opens the editing dialog and prepares the form
  openEditDialog(noteObj: Note) {
    const editableDiv = document.getElementById('editable-section');
    if (editableDiv) {
      this.editingCard = {
        ...noteObj, startDate: new Date(noteObj.startDate), endDate: new Date(noteObj.endDate),
        labels: this.notesLabelsMetaData.filter(x => noteObj.labels.find(y => y === x.id)).map(x => x.text),
        duration: this.getDuration(new Date(noteObj.startDate), new Date(noteObj.endDate))
      };
      editableDiv.style.display = 'block';
    }
  }

  // closes the edit dialog by either saving/cancelling based on user action
  closeEditDialog(saveData?: boolean) {
    if (saveData) {
      let validate = true;
      Object.keys(this.editingCard).forEach(key => { // validating if all the required details are there or not
        if (!this.editingCard[key]) {
          validate = false;
          this.snackBar.open('Please submite valid details');
        }
      })
      const noteObj = this.notesData.find(x => x.id === this.editingCard.id);
      if (noteObj) {
        const date = new Date(this.editingCard.startDate);
        this.editingCard.startDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
        noteObj.title = this.editingCard.title;
        noteObj.summary = this.editingCard.summary;
        noteObj.startDate = this.editingCard.startDate.getTime();
        noteObj.labels = this.editingCard.labels.map(x => this.notesLabelsMetaData.find(y => y.text === x).id);
        noteObj.endDate = new Date(this.editingCard.startDate.getTime() + ((parseInt(this.editingCard.duration) - 1)
          * 24 * 60 * 60 * 1000)).getTime();
        this.service.updateNote(noteObj.id, noteObj).subscribe(); // calling dummy endpoint to update note data
        this.prepareDataBasedOnDates();
      }
    }
    const editableDiv = document.getElementById('editable-section');
    if (editableDiv) {
      editableDiv.style.display = 'none';
    }
  }

  // editing labels in editing popup (inserting/deleting the labels)
  addOrRemoveChip(labelName) {
    const labelNameIndex = this.editingCard.labels.findIndex(x => x === labelName);
    if (labelNameIndex >= 0) {
      this.editingCard.labels.splice(labelNameIndex, 1);
    } else {
      this.editingCard.labels.push(labelName);
    }
  }

  // returns the number of workdays between two dates
  getDuration(startDate, endDate) {
    if (typeof (startDate) === 'number') {
      startDate = new Date(startDate);
    }
    if (typeof (endDate) === 'number') {
      endDate = new Date(endDate);
    }
    let count = 1;
    while (startDate.getTime() < endDate.getTime()) {
      const dayOfWeek = startDate.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) {
        count++;
      }
      startDate.setDate(startDate.getDate() + 1);
    }
    return count;
  }

  // called to arrange the date for each date cell, formats the card and its properties
  arrangeNoteData(label: number, date: any, index: number) {
    const tdBlock = document.getElementById(label + '-' + date.getTime());
    let dataInDate = this.dataSource.find(x => x.label === label);
    dataInDate = dataInDate.data.filter(x => x.startDate === date.getTime());
    if (index === 0) { // if it's first column in dates columns, filter all the notes with startDate < visibleDate
      dataInDate = [...dataInDate, ...dataInDate.filter(x => new Date(x.startDate) < this.visibleDates[0] &&
        new Date(x.endDate) > this.visibleDates[0])];
    }
    if (tdBlock && dataInDate.length > 0) {
      const responseData = dataInDate.reduce((newObj, iter) => {
        let lastDateBlock; let endDate;
        if (new Date(iter.endDate) > this.visibleDates[this.visibleDates.length - 1]) {
          // if enddate is beyond the visible region, consider last date as last part of visible region
          lastDateBlock = document.getElementById(label + '-' + this.visibleDates[this.visibleDates.length - 1].getTime());
          endDate = this.visibleDates[this.visibleDates.length - 1];
        } else {
          lastDateBlock = document.getElementById(label + '-' + iter.endDate);
          endDate = new Date(iter.endDate);
        }
        if (lastDateBlock) {
          // Math.round((b-a)/(1000*60*60*24))
          const noOfDays = Math.round((endDate - date)/(1000*60*60*24)) + 1;
          newObj.push({
            ...iter,
            width: (lastDateBlock.offsetLeft - tdBlock.offsetLeft) ? 
            // if width is 0(i.e. if startDate & endDate is same), set width to block width, else add block width to existing width
              (noOfDays * 18) : 18
          });
        }
        return newObj;
      }, []);
      return responseData;
    }
    return [];
  }

  // deletes the note
  deleteNote(noteId) {
    const index = this.notesData.findIndex(x => x.id === noteId);
    if (index >= 0) {
      this.notesData.splice(index, 1);
      this.prepareDataBasedOnDates();
    }
  }

}

interface Note {
  id: number;
  title: string;
  summary?: string;
  labels: number[];
  startDate: number;
  endDate: number;
}

interface NoteLabel {
  id: number;
  text: string;
}