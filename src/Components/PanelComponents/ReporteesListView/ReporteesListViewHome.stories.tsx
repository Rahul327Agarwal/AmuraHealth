import React from 'react';
import { Story, Meta } from '@storybook/react';
import ReporteesListViewHome from './ReporteesListViewHome';
import { IProps } from './ReporteesListViewHome.types';

export default {
  title: 'Reportees List view home/Reportees home',
  component: ReporteesListViewHome,
  parameters: {
    backgrounds: {
      defaulut: 'Light',
      values: [{ name: 'Light', value: '#FFFFFF' }],
    },
  },
} as Meta;
const TemPrimary: Story<IProps> = (args) => <ReporteesListViewHome {...args} />;
export const Primary = TemPrimary.bind({});
Primary.args = {
  setAction: () => {},
  selectedClient: {},
  sessions: {
    id_token:
      'eyJraWQiOiJZUU5JbzV0WnQ3UFZBbnRwNTZWYUhoVVJBSzJmOGlcL1FPbktvQTk4XC9wYzg9IiwiYWxnIjoiUlMyNTYifQ.eyJzdWIiOiJjYzZkODU2OC1mZDliLTRjYmQtOWQzOS04ODU5NzQ3NjRlYjUiLCJ6b25laW5mbyI6InRydWUiLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoLTFfZlhtWWxiZFlKIiwicGhvbmVfbnVtYmVyX3ZlcmlmaWVkIjp0cnVlLCJjb2duaXRvOnVzZXJuYW1lIjoiY2M2ZDg1NjgtZmQ5Yi00Y2JkLTlkMzktODg1OTc0NzY0ZWI1IiwiZ2l2ZW5fbmFtZSI6Ikpvc2h1YSIsImF1ZCI6IjV2ZTh1Z3ZtMTFkM2U2YWoxZWtobWpkbW04IiwiZXZlbnRfaWQiOiI4ZjNkZGNmNC05ZDAzLTRmN2ItYTFmNS0xNTlkNjQyMzE0YTgiLCJ0b2tlbl91c2UiOiJpZCIsImF1dGhfdGltZSI6MTY3ODc5MTY0NSwicGhvbmVfbnVtYmVyIjoiKzkxNTU1MDAwNDQ0MCIsImV4cCI6MTY3ODg3ODA0NSwiaWF0IjoxNjc4NzkxNjQ1LCJmYW1pbHlfbmFtZSI6IlRELTQiLCJlbWFpbCI6Ikpvc2h1YVRELTRAZ21haWwuY29tIn0.JBdFeMX4jf4T7uh6_GbrDGxNL5vbStzVBFposGD0xFKiyKpHlI2pqw7wGt2z6hhu0iFdi5mK3ARtsavYam7-scP784wuZ3JwbEPTBtbcQXo7mOe97OeZEGtbgGOeIslBNm5apiLNI6Kp3XhsWS1lFKs3p9dldhPCDOiDwJb45V3yGOa3cZ1M2exlghHApp6pMFETuIeAYkVmUcyihtRy09yriuh4x3ILyNmRm9uYmRboRtS6VKqZzy-kkyHhm1eInh6EgZW3ImhQngHNlgcgtQ0Jmsk18AO3tnHNv0mYQDtzcpDdA0_lNkygu__mxebJr4LZrxtMHfRspjimaffTdg',
    access_token:
      'eyJraWQiOiJQa0xzZjVjM0V4ZUhkUWtLS3lJb05kSTBBSmswaDhzN0ZoSHEwMW5rZTJzPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJjYzZkODU2OC1mZDliLTRjYmQtOWQzOS04ODU5NzQ3NjRlYjUiLCJldmVudF9pZCI6IjhmM2RkY2Y0LTlkMDMtNGY3Yi1hMWY1LTE1OWQ2NDIzMTRhOCIsInRva2VuX3VzZSI6ImFjY2VzcyIsInNjb3BlIjoiYXdzLmNvZ25pdG8uc2lnbmluLnVzZXIuYWRtaW4iLCJhdXRoX3RpbWUiOjE2Nzg3OTE2NDUsImlzcyI6Imh0dHBzOlwvXC9jb2duaXRvLWlkcC5hcC1zb3V0aC0xLmFtYXpvbmF3cy5jb21cL2FwLXNvdXRoLTFfZlhtWWxiZFlKIiwiZXhwIjoxNjc4ODc4MDQ1LCJpYXQiOjE2Nzg3OTE2NDUsImp0aSI6ImFmNzc3ZDk5LTYwMTktNDQ1NC05YWQ2LTJhMzY5ZjYzNTA4OSIsImNsaWVudF9pZCI6IjV2ZTh1Z3ZtMTFkM2U2YWoxZWtobWpkbW04IiwidXNlcm5hbWUiOiJjYzZkODU2OC1mZDliLTRjYmQtOWQzOS04ODU5NzQ3NjRlYjUifQ.dyNlXk19BmOzd1WDPWoBsyUYrNvmY_ICCIJXKf_aEX-0uXNs1I_6aFfO7ZiNnONaWvcD1Khjbh4vkIEFxy3hUmxxZkBz-O-maCT3KpOOoRd16QtxSI-iYcZmafA3CBLZEO91o0h9yn9wOabaoSWCIWE2qIJyHcTmjRPwyKqxwensxTdRELhq3qfQiDontbQwJ8cnhAeD1XvW9kqLaJKquxwF0Uwd1hmRtseqgl-fZsEK93PgLDWT9g0OKW7wAqpPaPR3dulJhZ7bzYEJUKsx33JEZCy_EMZxrYVNG8-HCo8xE4KC2DFGVjvAmv0diGhHNdPyPkR912wmJulh6wPL9w',
    refreshToken:
      'eyJjdHkiOiJKV1QiLCJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiUlNBLU9BRVAifQ.cejUkV_vLV0R5MvrNL1724kzWiiQrsI6coOn57HDfLBvR9PAmksgZlF8AEMhyJPa1s0WLInNZVyInQst2Y8cQKfQ5ZElyRbjzmoVCRAmQDFjaJw2hF86rP1i8q9A34tv84O7HAOeLxcItA90D0Qz_M2qLnGLVucNAOnALwtGHDJ6ItNJs69VNlUENWnRcG4gIDdjdAe4Dz9PXng2OKUPmPCAQCMde3RJbxvbAM75-cjE7S1grXaseaQeCsq_YD9UrbLEOKQjRL9c7Al6_UOhf23TtGczlJhFzeGFY3LwgMJuGAYE5KFjO7kmasXZBRjG9Zg17c7lTDW52aNDED2w1Q.GJU1DJuTN9_yHBdk.aucKH9sBmgeJ0pe5h3srSm0sqo95JaF3ceCct5As-Da9AaSqsT9QfWqIcZqN-UBs5UJO1JJbjxdhjy5X6wa0RMNCHagRNaUAFOeaEEY5wcv6c20crHT6_Va0Em7C7sgcDKT3b0s7YC1qIHDpRd8T-vnSMPyFAIZey-m3Wrex2IzXCVqH0w-hdtpwWpEYa21aN-Z5yJyoERoTd5RsCoLNHxDYW-I7RWEAijPXrrEF9Se-QnzPsBHtvtfOfE7mkgUavY2pmfVlOJ2MhQs8O3geU1-2a36ENOjTlcVJvPsvMYR-aaKr2KtyQcUN9tt_B-qC8ylVdMPIQgN-NiXNZh5OhsWJlunS7yFYsDt3UakDk-2j-xfJm0Lc5Zpak7cPmka7SAcpofJCJG_eN78EYx6CDJukbf-5QHHIy5Jy60-DdgBRa7TsyXviDV5XxuyCJ5B_Iae4p4PUZVlO1r-eqGuaINPmbb-dWcXgNehfFiLO7CPSA4NqGrqV8O_qtq69amGLqHDCK_uWkAdqwAkGWFhpKuSNWidqW5_fqOQOf60sJ5MDqJMn8uMClyo5RJXJQywJcJHsMicKuV5I1Fe7WfcUfcra1rKT_lAwKOv6CasqxL3T5P4SE7RrYL5tElJ-dmWDNko4a2TSf8hQDorOV6rc02zeNKXvfahfXZKzW7kHNQHKU50p4L8xlIijhkug836dzYhSZypxXnnSksvwCAo4SikBlW4CWR809kvS-OOMLlThZhBwn7cJQMmAtcMbNLwdOlBazbqLPe-_pzBKJ46j2L5qhv4z_l_rN2ffzUANp0tAlWawjEXWVh3tucu7mSZRqPuGXvtkjy00yz-qlhpqhEGpI0oujhalc_tLr3rbtW8eXl6bLN1Yvqzlb-A3cjzNOVTln3NDPbMwnNRfugyPGhvmVBQCvFLKHnCy9XmB7RG01xkz2fO-jTCXQaW8ojED4EmAaiUdnmFRRaV99okeYNYvx5WUrUqaGi1Rj3V3Xay5ylSrtI4HnhrojCrEf-9jCYXFZ2Apjwd3OT87vsmu-q3cnkcAaYAaKX8iT2XD9KoEF-3OeDvFx2Ww8ZNKWRPjrC5YTYOx3UGApNkQXhlIycZDNO1Z4LMFY7Z0lv_U26ShC991batMstSqtAvL3uTT2rbE6bdqY7aHb4HJ1LhcNxq9Jn3WvrnEwBjx5IljBj_UEqrMyStJT5c3ZRSYOsImZjQQZeFJGefHpXpygGw9-WZsGCsjTD2AuYrpefz-KqG3qTTBL-mZgjoRgkAEyz_G3YN34AeiyCeIRz8oU87_01jGs9Oncj0wiytl0Vb2MP3JLcOuTjg7tmB1dh8oBg.3Loy4hrcdqgOYae4fS6opg',
    access_token_expiration: 658399,
    user: {
      id: 'cc6d8568-fd9b-4cbd-9d39-885974764eb5',
      first_name: 'Joshua',
      last_name: 'TD-4',
      email: 'JoshuaTD-4@gmail.com',
      roles: [],
      rolesAcrossTenants: ['basic-user', 'basic-user'],
      chatPassword: '',
      mobile: '+915550004440',
    },
  },
  user: {},
  childEventTrigger: () => {},
  parameter: {},
  registerEvent:  () => {},
  unRegisterEvent:  () => {},
  notifyEvent: {},
  selectedTenant: {},
  panel: {},
  role: 'string',
};
