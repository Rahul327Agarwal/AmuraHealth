export const initialState = {
  description: "",
  preparationTime: "",
  videoLink: "",
  image: "",
  stepNo: 1,
};

export const validateDetails = (params, imageupload) => {
  let errorMessages = JSON.parse(JSON.stringify(initialState));
  let isValid = true;
  if (!params?.description.trim()) {
    errorMessages.description = "Please enter a valid input.";
    isValid = false;
  }
  if (!params?.preparationTime) {
    errorMessages.preparationTime = "Please enter a valid input.";
    isValid = false;
  }
  if (Number(params.preparationTime) == 0) {
    errorMessages.preparationTime = "Please enter a valid input.";
    isValid = false;
  }
  // if (!params?.videoLink && imageupload==0) {
  //     errorMessages.videoLink = "Please enter a valid input.";
  //     isValid = false;
  // }
  if (params?.videoLink && imageupload == 0) {
    var youtuberegex =
      /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
    if (!params.videoLink.match(youtuberegex)) {
      errorMessages.videoLink = "Please enter a Valid youtube link";
      isValid = false;
    }
  }
  if (params?.videoLink && imageupload != 0) {
    errorMessages.videoLink = "Either upload image or enter valid video url";
    isValid = false;
  }
  return { errorMessages, isValid };
};
