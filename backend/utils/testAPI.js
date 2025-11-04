import http from 'http';

async function testJobsAPI() {
    return new Promise((resolve, reject) => {
        console.log('Testing jobs API at http://localhost:3000/api/v1/job/get...');
        
        const options = {
            hostname: 'localhost',
            port: 3000,
            path: '/api/v1/job/get',
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const req = http.request(options, (res) => {
            let data = '';
            
            res.on('data', (chunk) => {
                data += chunk;
            });
            
            res.on('end', () => {
                try {
                    console.log('Status:', res.statusCode);
                    const json = JSON.parse(data);
                    console.log('Success:', json.success);
                    console.log('Jobs count:', json.jobs?.length || 0);
                    if (json.jobs?.length > 0) {
                        console.log('Sample jobs:');
                        json.jobs.slice(0, 3).forEach((job, i) => {
                            console.log(`  ${i + 1}. ${job.title} at ${job.company?.name || 'Unknown'}`);
                        });
                    }
                    resolve();
                } catch (error) {
                    console.error('Parse error:', error.message);
                    reject(error);
                }
            });
        });

        req.on('error', (error) => {
            console.error('Connection error:', error.message);
            console.error('Make sure the backend is running on port 3000');
            reject(error);
        });

        req.end();
    });
}

testJobsAPI().catch(() => process.exit(1));
