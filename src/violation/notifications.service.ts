import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { ViolationEntity } from './database/entities/violation.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/database/entities/user.entity';

const API_KEY = 'ZmYwMjBjYWItMTBkNC00YWJmLWE2YjEtYzM2MjQzZWRhNzE0';
const APP_ID = 'f7e3df97-3e9a-47fa-abd8-7b9816801568';

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(ViolationEntity)
    private violationRepo: Repository<ViolationEntity>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  async createNotification(
    civilId: string,
    transportationMean: number,
    dueDate: string,
  ) {
    const civilian = await this.userRepo.findOne({ where: { civilId } });
    console.log(civilian);
    const transportationMeans = ['', 'Xe đạp', 'Xe máy', 'Ô tô'];
    const message = `
Công dân ${civilian.name} đã bị phạt do vi phạm nồng độ cồn khi điều khiển phương tiện ${transportationMeans[transportationMean]}.
Vui lòng nộp phạt trước ngày ${dueDate} để nhận lại phương tiện!
    `;

    const body = {
      app_id: APP_ID,
      include_external_user_ids: [civilian.civilId],
      contents: {
        en: message,
      },
      headings: {
        en: 'Bạn có thông báo vi phạm mới',
      },
      large_icon: 'no_alcohol',
      small_icon: 'no_alcohol',
      send_after: '0',
      // url: 'https://google.com',
    };

    await axios.post('https://onesignal.com/api/v1/notifications', body, {
      headers: {
        Authorization: `Basic ${API_KEY}`,
      },
    });
  }
}
