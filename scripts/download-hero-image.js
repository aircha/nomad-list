const https = require('https');
const fs = require('fs');
const path = require('path');

const UNSPLASH_ACCESS_KEY = '7spH7692NfLGqiO9OTqumqliOacpKLzjaEfIQrbH3-g';

// Hero 이미지 검색 쿼리들
const heroQueries = [
    'digital nomad working laptop cafe view',
    'remote work tropical beach laptop',
    'coworking space modern bright'
];

const publicDir = path.join(__dirname, '../public');

function searchUnsplashImage(query, page = 1) {
    return new Promise((resolve, reject) => {
        const url = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&page=${page}&orientation=landscape`;

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

async function downloadHeroImages() {
    console.log('🎨 Hero 섹션용 디지털 노마드 이미지를 다운로드합니다...\n');

    for (let i = 0; i < heroQueries.length; i++) {
        const query = heroQueries[i];
        const filename = `hero-${i + 1}.jpg`;
        const filepath = path.join(publicDir, filename);

        try {
            console.log(`🔍 [${i + 1}/${heroQueries.length}] "${query}" 검색 중...`);
            const imageUrl = await searchUnsplashImage(query);

            await downloadImage(imageUrl, filepath);
            console.log(`✅ [${i + 1}/${heroQueries.length}] ${filename} - 다운로드 완료`);

            await new Promise(resolve => setTimeout(resolve, 1200));

        } catch (error) {
            console.error(`❌ [${i + 1}/${heroQueries.length}] ${filename} - 실패: ${error.message}`);
        }
    }

    console.log('\n✨ Hero 이미지 다운로드 완료!');
    console.log('\n📁 다운로드된 파일:');
    console.log('   - public/hero-1.jpg (디지털 노마드 카페)');
    console.log('   - public/hero-2.jpg (해변 원격근무)');
    console.log('   - public/hero-3.jpg (코워킹 스페이스)');
    console.log('\n💡 hero.tsx에서 /hero-1.jpg 형식으로 사용하세요');
}

downloadHeroImages().catch(console.error);
