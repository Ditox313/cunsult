import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LikesService } from '../../servises/likes.service';

@Component({
  selector: 'app-add-like',
  templateUrl: './add-like.component.html',
  styleUrls: ['./add-like.component.css'],
})
export class AddLikeComponent implements OnInit {
  isLike: boolean = false;
  addLike$: any;
  actualCase: any;
  isDislike: boolean = false

  @Input() caseId: string | undefined;
  @Input() userId: string | undefined;

  constructor(private likesService: LikesService) {}

  ngOnInit(): void {
    this.likesService.getById(this.caseId).subscribe((res) => {
      this.actualCase = res;

      if (res.likes.find((item) => item.userId === this.userId)) {
        this.isLike = true;
      }

      if (res.disLikes.find((item) => item.userId === this.userId)) {
        this.isDislike = true;
      }
    });
  }

  actionLike() {
    if (!this.isDislike) {
      if (!this.isLike) {
        this.addLike$ = this.likesService
          .addLike(this.caseId, this.userId)
          .subscribe((res) => {
            this.actualCase = res.case;
          });

        this.isLike = true;
      } else {
        this.likesService
          .removeLike(this.caseId, this.userId)
          .subscribe((res) => {
            this.actualCase = res;
          });
        this.isLike = false;
      }
    }
  }

  actionDisLike() {
    if (!this.isLike) {
      if (!this.isDislike) {
        this.likesService
          .addDisLike(this.caseId, this.userId)
          .subscribe((res) => {
            this.actualCase = res.case;
          });
        this.isDislike = true;
      } else {
        this.likesService
          .removeDisLike(this.caseId, this.userId)
          .subscribe((res) => {
            this.actualCase = res;
          });
        this.isDislike = false;
      }
    }
  }
}
