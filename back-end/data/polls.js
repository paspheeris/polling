module.exports = [
    {
      key: "4d4cdb42-3475-432f-bccc-c3cb5d7765d9",
      author_id: "google-oauth2|105786279754106054402",
      question: 'What\'s the best city?' ,
      allChoices: ['SF', 'NYC', 'Chicago'],
      votesByChoice: [
        {choiceName: 'SF', count: 5},
        {choiceName: 'NYC', count: 2},        
        {choiceName: 'Chicago', count: 6},        
      ],
      participantsByIp: ['11.111.111.111', '33.333.333.333'],
      participantsById: ["google-oauth2|105786279754106054402"]
    },
    {
      key: "e4c25936-55d8-44a8-8684-eb0bc7720442",
      author_id: "google-oauth2|105786279754106054402",
      question: 'What\'s the best color',
      allChoices: ['Red', 'Green', 'Blue'],
      // votesByChoice: {Red: 8, Green: 9, Blue: 10},
      votesByChoice: [
        {choiceName: 'Red', count: 8},
        {choiceName: 'Green', count: 9},        
        {choiceName: 'Blue', count: 10},        
      ],
      participantsByIp: ['11.111.111.111', '33.333.333.333'],
      participantsById: ["google-oauth2|105786279754106054402"]
    },
    {
      key: "27fb4dab-c512-4685-a6a4-2003a8276439",
      author_id: "github|20876393",
      question: 'What\'s your favorite food?',
      allChoices: ['Pizza', 'Sushi', 'Hamburgers'],
      votesByChoice: [
        {choiceName: 'Pizza', count: 90},
        {choiceName: 'Sushi', count: 31},        
        {choiceName: 'Hamburgers', count: 32},        
      ],
      // votesByChoice: {Pizza: 90, Sushi: 31, Hamburgers: 32},
      participantsByIp: ['22.222.222.222', '33.333.333.333'],
      participantsById: ["github|20876393"]
    },
    {
      key: "f66e9aea-0d84-438c-bffe-d7fec535929b",
      author_id: "github|20876393",
      question: 'What\'s your favorite sport?',
      allChoices: ['Soccer', 'Football', 'Tennis'],
      // votesByChoice: {Soccer: 0, Football: 1, Tennis: 1},
      votesByChoice: [
        {choiceName: 'Soccer', count: 0},
        {choiceName: 'Football', count: 1},        
        {choiceName: 'Tennis', count: 1},        
      ],
      participantsByIp: ['22.222.222.222', '33.333.333.333'],
      participantsById: ["github|20876393"]
    },
];
// export default JSON.stringify(polls);