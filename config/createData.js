const Product = require("../models/Product");

const mockData = [
  {
    name: "Tâm Lý Học",
    authorName: "DK",
    price: 300000,
    description: "Tâm Lí Học - Khái Lược Những Tư Tưởng Lớn",
    publicUrl:
      "https://saysach.com/wp-content/uploads/2020/06/tam-ly-h%E1%BB%8Dc-khai-luc-nhung-tu-tuong-lon-1.jpg",
  },
  {
    name: "Kinh Tế Học",
    authorName: "DK",
    price: 300000,
    description: "Consectetur adipiscing elit.",
    image:
      "https://lzd-img-global.slatic.net/g/p/e440f5fa0e0ce32045851ab3deef6a9f.jpg_720x720q80.jpg",
  },
  {
    name: "Triết Học",
    price: 200000,
    authorName: "DK",
    description: "Sed do eiusmod tempor incididunt.",
    publicUrl:
      "https://salt.tikicdn.com/cache/w1200/ts/product/0c/56/08/0618decdc0d80412ba7a5fedc67f535e.jpg",
  },
  {
    name: "Tình cờ hạnh phúc",
    authorName: "Daniel Gilbert",
    price: 50000,
    description: "Ut enim ad minim veniam.",
    publicUrl: "https://picsum.photos/200/300?random=4",
  },
  {
    name: "How psychology works",
    authorName: "DK",
    price: 50000,
    description:
      "How Psychology Works là một hướng dẫn toàn diện về thế giới tâm lý học hấp dẫn. Cuốn sách bao gồm nhiều chủ đề khác nhau bao gồm lịch sử tâm lý học, não và hệ thần kinh, cảm giác, học tập và trí nhớ, cảm xúc, sức khỏe tâm thần, và nhiều hơn thế nữa. Đây là một cuốn sách cần thiết để hiểu được hành vi con người và cách thức hoạt động của tâm trí.",
    publicUrl: "https://picsum.photos/200/300?random=5",
  },
  {
    name: "Nhập môn lập trình",
    authorName: "Trần Đan Thư",
    price: 50000,
    description:
      "Nhập môn lập trình là cuốn sách dành cho những người mới bắt đầu học lập trình. Cuốn sách cung cấp các kiến thức cơ bản về lập trình, bao gồm cách sử dụng các công cụ phát triển phần mềm, cấu trúc dữ liệu và giải thuật, lập trình hướng đối tượng và nhiều hơn thế nữa. Với cuốn sách này, bạn sẽ được học các kỹ năng cần thiết để trở thành một lập trình viên tài ba. Cuốn sách cũng cung cấp những ví dụ thực tế và các bài tập để giúp bạn thực hành và nắm vững kiến thức lập trình.",
    publicUrl:
      "https://i0.wp.com/motreview.com.vn/wp-content/uploads/2021/12/review-hieu-het-ve-tam-ly-hoc.jpg?fit=800%2C600&ssl=1",
  },
  {
    name: "Satra in 60 minutes",
    authorName: "Walther Ziegler",
    price: 50000,
    description:
      "Sartre trong 60 phút của tác giả Walther Ziegler là một hướng dẫn ngắn gọn về cuộc đời và triết học của Jean-Paul Sartre, một nhà triết học và nhà văn người Pháp thuộc trường phái tồn tại chủ nghĩa. Cuốn sách nhằm cung cấp cho người đọc hiểu rõ về các ý tưởng chính của Sartre một cách rõ ràng và dễ hiểu.",
    publicUrl:
      "https://binhbanbook.com/wp-content/uploads/2023/03/33418e009db340ed19a2.jpg",
  },
  {
    name: "How Food Works",
    authorName: "DK",
    price: 300000,
    description:
      "How Food Works của DK là một hướng dẫn chi tiết về khoa học về thực phẩm và dinh dưỡng. Sách bao gồm nhiều chủ đề về thực phẩm, bao gồm cấu trúc, tiêu hóa và chuyển hóa, cũng như vai trò của các chất dinh dưỡng khác nhau trong việc duy trì một cơ thể khỏe mạnh. Sách cung cấp cho người đọc hiểu sâu hơn về các quá trình phức tạp xảy ra trong cơ thể khi ta tiêu thụ thực phẩm. Ngoài ra, sách còn cung cấp cho độc giả những lời khuyên thực tế về cách lựa chọn thực phẩm lành mạnh và duy trì một chế độ ăn uống cân bằng.",
    publicUrl:
      "https://sachnhanam.s3.ap-southeast-1.amazonaws.com/wp-content/uploads/20211101112349/how-food-works-7-min.png",
  },
  {
    name: "Product 9",
    authorName: "Unknown",
    price: 30000,
    description: "Consectetur adipiscing elit.",
    publicUrl: "https://picsum.photos/200/300?random=9",
  },
  {
    name: "Product 10",
    authorName: "Unknown",
    price: 1000000,
    description: "Sed do eiusmod tempor incididunt.",
    publicUrl: "https://picsum.photos/200/300?random=10",
  },
];

const insertData = async () => {
  try {
    const res = await Product.insertMany(mockData);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

module.exports = insertData;
