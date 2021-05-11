const id = '_id'
const update_time = 'update_time'
const create_time = 'create_time'
const view_cnt = 'view_cnt'

export const tableKey = {
  // cms发布
  carousel: {
    image: 'image',
    location: 'location',

    // news_key
    news_id: 'news_id',

    create_time,
    update_time,
  },
  // cms发布
  example_project: {
    _name: 'example_project',

    id,
    content: 'content',
    title: 'title',
    subtitle: 'subtitle',
    image: 'image',


    view_cnt,
    create_time,
    update_time,
  },
  // cms发布
  designer: {
    _name: 'designer',
    id,
    name: 'name',
    label_list: 'label',
    style: 'style',
    experience: 'experience',

    update_time,
    create_time,
  },
  // cms发布
  questionnaire: {
    _name: 'questionnaire',
    id,

    link: 'link',

    // project key
    relevant_project_id: 'relevant_project_id',

    // 是否推送过消息？
    is_pushed_message: "is_pushed_message",

    view_cnt,
    create_time,
    update_time,
  },
  // cms发布
  news: {
    _name: 'news',
    id,


    title: 'title',
    subtitle: 'subtitle',
    image_list: 'image_list',
    content: 'content',


    // comment key
    relevant_comment_id_list: 'relevant_comment_id_list',

    view_cnt,
    create_time,
    update_time,
  },


  user: {
    _name: 'user',
    id,
    open_id: '_openid',
    nickname: 'nickname',
    mobile: 'mobile',
    location: 'location',
    type: 'type',
    avatar: 'avatar',
    // project key
    relevant_project_id_list: 'relevant_project_list',
    my_project_id_list: 'my_project_id_list',
    // questionnaire key
    todo_questionnarie_id_list: 'todo_questionnarie_id_list',
    done_questionnarie_id_list: 'done_questionnarie_id_list',
    // message key
    unread_message_id_list: 'unread_message_id_list',
    read_message_id_list: 'read_message_id_list',
    // comment key
    punlished_comment_id_list: 'punlished_comment_id_list',


    last_login_time:'last_login_time',
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

    title: 'title',
    status: 'status',
    status_time_list: 'status_time_list',
    image: 'image',
    location: 'location',

    // questionnaire key
    relevant_questionnaire_id_list: 'relevant_questionnaire_id_list',

    // user key
    publish_user_id: 'publish_user_id',
    relevant_user_id: 'relevant_user_id',

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