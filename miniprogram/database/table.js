const id = '_id'
const update_time = 'update_time'
const create_time = 'create_time'
const view_cnt = 'view_cnt'

export const tableKey = {
  carousel: {
    image: 'image',
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
    avatar: 'avatar',
    // project key
    relevent_project_id_list: 'relevent_project_list',
    my_project_id_list: 'my_project_id_list',
    // questionnaire key
    todo_questionnarie_id_list: 'todo_questionnarie_id_list',
    done_questionnarie_id_list: 'done_questionnarie_id_list',
    // message key
    unread_message_id_list: 'unread_message_id_list',
    read_message_id_list: 'read_message_id_list',
    // comment key
    punlished_comment_id_list: 'punlished_comment_id_list',
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
    status_time: 'status_time',
    image: 'image',
    location: 'location',

    // questionnaire key
    questionnaire_id_list: 'questionnaire_id_list',

    // user key
    publish_user_id: 'publish_user_id',

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

    // comment key
    relevent_comment_id_list: 'relevent_comment_id_list',

    view_cnt,
    create_time,
    update_time,
  },

  comment: {
    _name: 'comment',
    id,

    detail: 'detail',

    // user key
    published_user_name: 'published_user_id',
    published_user_avatar: 'published_user_avatar',

    create_time,
    update_time,
  }
}