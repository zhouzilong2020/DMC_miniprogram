const id = '_id'
const update_time = 'update_time'
const create_time = 'create_time'
const view_cnt = 'view_cnt'

export const tableKey = {
  carousel: {
    image: image,
    location: 'location',

    // news_key
    news_id: 'news_id',

    create_time,
    update_time,
  },

  example_project: {
    _name: 'example_project',

    id,
    content: {
      title: 'title',
      subtitle: 'subtitle',
      image: 'image',
      detail: 'detail',
    },

    view_cnt,
    create_time,
    update_time,
  },

  designer: {
    _name: 'designer',
    id,

    name: 'name',
    label: 'label',
    style: 'style',
    experience: 'experience',

    update_time,
    create_time,
  },

  user: {
    _name: 'user',
    id,

    open_id: 'open_id',
    name: 'name',
    mobile: 'mobile',
    location: 'location',
    type: 'type',

    // project key
    relevent_project_id: 'relevent_project',
    my_project_id: 'my_project_id',

    // questionnaire key
    todo_questionnarie_id: 'todo_questionnarie_id',
    done_questionnarie_id: 'done_questionnarie_id',

    // message key
    unread_message_id: 'unread_message_id',
    read_message_id: 'read_message_id',

    create_time,
    update_time,
  },

  questionnaire: {
    _name: 'questionnaire',
    id,

    link: 'link',

    view_cnt,
    create_time,
    update_time,
  },

  message: {
    _name: 'message',
    id,

    type: 'type',
    detail: 'detail',

    create_time,
    update_time,
  },

  project: {
    _name: 'project',
    id,

    name: 'name',
    status: 'status',
    image: 'image',
    location: 'location',

    // questionnaire key
    questionnaire_id: 'questionnaire_id',

    view_cnt,
    create_time,
    update_time,
  },

  news: {
    _name: 'news',
    id,

    content: {
      title: 'title',
      subtitle: 'subtitle',
      image: 'image',
      detail: 'detail',
    },

    view_cnt,
    create_time,
    update_time,
  },

  comment: {
    _name: 'comment',
    id,

    detail: 'detail',

    create_time,
    update_time,
  }
}