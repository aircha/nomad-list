const https = require('https');
const fs = require('fs');
const path = require('path');

// Unsplash API Access Key
const UNSPLASH_ACCESS_KEY = '7spH7692NfLGqiO9OTqumqliOacpKLzjaEfIQrbH3-g';

// 문제가 있는 도시들
const problematicCities = [
    {
        id: 'buenos-aires-argentina',
        name: 'Buenos Aires',
        country: 'Argentina',
        searchTerm: 'Buenos Aires Argentina downtown skyline day'
    },
    {
        id: 'playa-del-carmen-mexico',
        name: 'Playa del Carmen',
        country: 'Mexico',
        searchTerm: 'Playa del Carmen Mexico city street downtown'
    },
    {
        id: 'montevideo-uruguay',
        name: 'Montevideo',
        country: 'Uruguay',
        searchTerm: 'Montevideo Uruguay downtown cityscape close'
    }
];

const citiesDir = path.join(__dirname, '../public/cities');

// Unsplash API로 이미지 검색
function searchUnsplashImage(query) {
    return new Promise((resolve, reject) => {
        const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`;

        const options = {
            headers: {
                'Authorization': `Client-ID ${UNSPLASH_ACCESS_KEY}`,
                'Accept-Version': 'v1'
            }
        };

        https.get(url, options, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                try {
                    const jsonData = JSON.parse(data);
                    if (jsonData.results && jsonData.results.length > 0) {
                        resolve(jsonData.results[0].urls.regular);
                    } else {
                        reject(new Error('No images found'));
                    }
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', reject);
    });
}

// 이미지 다운로드 함수
function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307) {
                downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
                return;
            }

            if (response.statusCode === 200) {
                const fileStream = fs.createWriteStream(filepath);
                response.pipe(fileStream);
                fileStream.on('finish', () => {
                    fileStream.close();
                    resolve();
                });
            } else {
                reject(new Error(`Failed to download: ${response.statusCode}`));
            }
        }).on('error', reject);
    });
}

// 문제가 있는 이미지들 재다운로드
async function redownloadProblematicImages() {
    console.log('🔄 문제가 있는 이미지들을 재다운로드합니다...\n');

    for (let i = 0; i < problematicCities.length; i++) {
        const city = problematicCities[i];
        const filename = `${city.id}.jpg`;
        const filepath = path.join(citiesDir, filename);

        try {
            console.log(`🔍 [${i + 1}/${problematicCities.length}] ${city.name} - 검색 중 (더 나은 이미지 찾는 중)...`);

            const imageUrl = await searchUnsplashImage(city.searchTerm);

            // 기존 파일 삭제
            if (fs.existsSync(filepath)) {
                fs.unlinkSync(filepath);
            }

            // 새 이미지 다운로드
            await downloadImage(imageUrl, filepath);
            console.log(`✅ [${i + 1}/${problematicCities.length}] ${city.name} - 다운로드 완료`);

            await new Promise(resolve => setTimeout(resolve, 1200));

        } catch (error) {
            console.error(`❌ [${i + 1}/${problematicCities.length}] ${city.name} - 실패: ${error.message}`);
        }
    }

    console.log('\n✨ 문제가 있던 이미지들이 교체되었습니다!');
}

// 실행
redownloadProblematicImages().catch(console.error);
