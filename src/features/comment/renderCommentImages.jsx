function decodeHtmlEntities(text) {
  const txt = document.createElement("textarea");
  txt.innerHTML = text;
  return txt.value;
}

export function renderCommentImages(body) {
  const decodedBody = decodeHtmlEntities(body);

  // Match standard image URLs
  const imageRegex =
    /(https?:\/\/[^\s'"<>]+?\.(jpg|jpeg|png|gif|webp)(\?[^\s'"<>]*)?)/gi;

  // Match Reddit-style giphy embed syntax
  const giphyRegex = /!\[.*?\]\(giphy\|([^)]+)\)/gi;

  const allMatches = [];
  let lastIndex = 0;

  // Combine both image types in one parser
  const combinedRegex = new RegExp(
    `${imageRegex.source}|${giphyRegex.source}`,
    "gi"
  );

  decodedBody.replace(
    combinedRegex,
    (match, stdImgUrl, _1, _2, giphyId, offset) => {
      if (lastIndex < offset) {
        allMatches.push({
          type: "text",
          content: decodedBody.slice(lastIndex, offset),
        });
      }

      if (stdImgUrl) {
        allMatches.push({ type: "image", content: stdImgUrl });
      } else if (giphyId) {
        const giphyUrl = `https://media.giphy.com/media/${giphyId}/giphy.gif`;
        allMatches.push({ type: "image", content: giphyUrl });
      }

      lastIndex = offset + match.length;
      return match;
    }
  );

  if (lastIndex < decodedBody.length) {
    allMatches.push({ type: "text", content: decodedBody.slice(lastIndex) });
  }

  return allMatches.map((part, i) => {
    if (part.type === "image") {
      return (
        <div key={i}>
          <img
            src={part.content}
            alt="Comment media"
            style={{ maxWidth: "100%", margin: "0.5em 0" }}
          />
        </div>
      );
    } else {
      return <span key={i}>{part.content}</span>;
    }
  });
}
