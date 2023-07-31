export default {
  title: 'User', // Sanity studio 에서 볼 Title
  name: 'user',
  type: 'document',
  fields: [ //fields는 배열이고 각각 어떤 필드가 있는지 객체안에서 보여줌.
    {
      title: 'Username', // studio ui에서 보는 이름
      name: 'username', //  database, backend에서 접근할때 쓰는 이름, key
      type: 'string',
    },
    {
      title: 'Name',
      name: 'name',
      type: 'string',
    },
    {
      title: 'Email',
      name: 'email',
      type: 'string',
    },
    {
      title: 'Image',
      name: 'image',
      type: 'string',
    },
    {
      title: 'Following', //Following들에 대한 배열
      name: 'following',
      type: 'array', 
      of: [ // 어떤타입의 배열? reference
        {
          type: 'reference', // 다른 사용자의 reference를 참고함
          to: [{type: 'user'}], // user 스키마를 참고함
        },
      ],
      validation: (Rule) => Rule.unique(), // 조건? 중복을 허용하지 않음.
    },
    {
      title: 'Followers', //Followers들에 대한 배열
      name: 'followers',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'user'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
    {
      title: 'Bookmarks',
      name: 'bookmarks',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'post'}],
        },
      ],
      validation: (Rule) => Rule.unique(),
    },
  ],
  preview: { // sanity-studio에서 프리뷰로 post/user관리
    select: {
      title: 'name',
      subtitle: 'username',
    },
  },
}
