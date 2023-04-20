export const ValidationsConstant = {
  movie: {
    title:  {
      max: 100,
      min: 1,
    },
    description: {
      max: 1000,
      min: 1,
    }
  },
  user: {
    passwords: {
      max: 50,
      min: 8,
    }
  }
}