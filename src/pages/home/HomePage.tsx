import { Typography, Card, Row, Col, Divider } from "antd";
import styles from "./HomePage.module.scss";
import kohaku from "../../assets/images/kohaku.png";
import sanke from "../../assets/images/sanke.jpg";
import showa from "../../assets/images/showa.png";
import eat from "../../assets/images/eat.png";
import health from "../../assets/images/health.png";
import live from "../../assets/images/live.jpeg";
import logoKoi from "../../assets/images/koi-the.webp";

const { Title, Paragraph } = Typography;

interface KoiVariety {
  name: string;
  image: string;
  description: string;
  characteristics: string[];
}

const koiVarieties: KoiVariety[] = [
  {
    name: "Kohaku",
    image: kohaku,
    description:
      "Cá Koi Kohaku có màu trắng làm nền với các đốm đỏ trên thân. Đây là một trong những giống cá Koi được yêu thích nhất.",
    characteristics: [
      "Màu sắc: Trắng và đỏ",
      "Độ dài trung bình: 60-70cm",
      "Tuổi thọ: 25-35 năm",
      "Đặc điểm nổi bật: Hoa văn đỏ rõ ràng, cân đối",
    ],
  },
  {
    name: "Sanke",
    image: sanke,
    description:
      "Sanke là giống cá Koi ba màu với nền trắng, hoa văn đỏ và điểm đen. Tạo nên vẻ đẹp độc đáo và sang trọng.",
    characteristics: [
      "Màu sắc: Trắng, đỏ và đen",
      "Độ dài trung bình: 65-75cm",
      "Tuổi thọ: 25-35 năm",
      "Đặc điểm nổi bật: Hoa văn phức tạp, hài hòa",
    ],
  },
  {
    name: "Showa",
    image: showa,
    description:
      "Showa có nền đen với các hoa văn đỏ và trắng. Giống cá này thường có vẻ đẹp mạnh mẽ và ấn tượng.",
    characteristics: [
      "Màu sắc: Đen, đỏ và trắng",
      "Độ dài trung bình: 70-80cm",
      "Tuổi thọ: 25-35 năm",
      "Đặc điểm nổi bật: Màu đen sâu, hoa văn tương phản",
    ],
  },
];

export default function HomePage() {

  return (
    <div className={styles.homePage}>
      <section className={styles.heroSection}>
        <div className={styles.heroContent}>
          <Title>Chào mừng đến với Koi Fish Store</Title>
          <Paragraph className={styles.heroText}>
            Khám phá vẻ đẹp và sự quý phái của những chú cá Koi Nhật Bản
          </Paragraph>
        </div>
      </section>
      <section className={styles.introSection}>
        <Row gutter={[32, 32]} align="middle">
          <Col xs={24} md={12}>
            <img src={logoKoi} alt="Koi pond" className={styles.introImage} />
          </Col>
          <Col xs={24} md={12}>
            <Title level={2}>Về Chúng Tôi</Title>
            <Paragraph>
              Koi Fish Store tự hào là nhà cung cấp cá Koi hàng đầu với hơn 15
              năm kinh nghiệm. Chúng tôi chuyên nhập khẩu và phân phối các giống
              cá Koi chất lượng cao từ những trang trại uy tín tại Nhật Bản.
            </Paragraph>
            <Paragraph>
              Đội ngũ chuyên gia của chúng tôi luôn sẵn sàng tư vấn để bạn có
              thể lựa chọn được những chú cá Koi phù hợp nhất, cùng với đó là
              những hướng dẫn chăm sóc chi tiết để đảm bảo cá phát triển khỏe
              mạnh.
            </Paragraph>
          </Col>
        </Row>
      </section>

      <section className={styles.varietiesSection}>
        <Title level={2} className={styles.sectionTitle}>
          Các Giống Cá Koi Phổ Biến
        </Title>
        <Row gutter={[24, 24]}>
          {koiVarieties.map((variety, index) => (
            <Col xs={24} md={8} key={index}>
              <Card
                hoverable
                cover={<img alt={variety.name} src={variety.image} />}
                className={styles.varietyCard}
              >
                <Title level={3}>{variety.name}</Title>
                <Paragraph>{variety.description}</Paragraph>
                <Divider />
                <ul className={styles.characteristics}>
                  {variety.characteristics.map((char, idx) => (
                    <li key={idx}>{char}</li>
                  ))}
                </ul>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section className={styles.tipsSection}>
        <Title level={2}>Hướng Dẫn Chăm Sóc</Title>
        <Row gutter={[24, 24]}>
          <Col xs={24} md={8}>
            <Card className={styles.tipCard} cover={<img alt="" src={live} />}>
              <Title level={4}>Môi Trường Sống</Title>
              <Paragraph>
                Cá Koi cần được nuôi trong hồ có không gian đủ rộng, nước sạch
                và được lọc thường xuyên. Nhiệt độ nước lý tưởng từ 15-25°C.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card className={styles.tipCard} cover={<img alt="" src={eat} />}>
              <Title level={4}>Chế Độ Dinh Dưỡng</Title>
              <Paragraph>
                Cá Koi cần được cho ăn thức ăn chuyên dụng, giàu protein và
                vitamin. Cho ăn 2-3 lần/ngày vào mùa hè và 1-2 lần/ngày vào mùa
                đông.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            <Card
              className={styles.tipCard}
              cover={<img alt="" src={health} />}
            >
              <Title level={4}>Theo Dõi Sức Khỏe</Title>
              <Paragraph>
                Kiểm tra thường xuyên các dấu hiệu bệnh lý, chất lượng nước và
                hành vi của cá để đảm bảo sức khỏe tốt nhất.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </section>
    </div>
  );
}
