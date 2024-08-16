import { Button } from '@/components/ui/button';
import { Heading, Text, Strong } from '@radix-ui/themes';
// import { Head } from "next"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const About = () => {
  return (
    <div className="tw-container tw-mx-auto tw-py-10 tw-px-4 lg:tw-px-8">
      <Heading as="h2" className="tw-text-center tw-text-3xl lg:tw-text-4xl tw-font-bold tw-mb-10">About Us</Heading>

      <div className="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 tw-gap-8">
        <Card className="tw-bg-white tw-shadow-lg tw-rounded-lg">
          <CardContent className="tw-flex tw-flex-col tw-items-center tw-text-center tw-p-6">
            <img src="/images/logo.png" alt="Secure CDN" className="tw-mb-4 tw-w-32 tw-h-32 tw-object-contain" />
            <Heading as="h3" className="tw-text-xl tw-font-semibold tw-mb-2">Secure Your Data</Heading>
            <Text className="tw-text-base tw-text-gray-600">
              We provide advanced solutions for securely storing and delivering your files.
            </Text>
          </CardContent>
          <CardFooter className="tw-flex tw-justify-center tw-py-4">
            <Button >Get Started</Button>
          </CardFooter>
        </Card>

        <Card className="tw-bg-white tw-shadow-lg tw-rounded-lg">
          <CardContent className="tw-p-6">
            <CardHeader>
                <CardTitle>How It Works</CardTitle>
            </CardHeader>
            <ul className="tw-list-disc tw-list-inside tw-text-base tw-text-gray-600">
              <li className="tw-mb-2">
                <Strong>File Encryption:</Strong> Strong AES-256 encryption for your data.
              </li>
              <li className="tw-mb-2">
                <Strong>Secure Storage:</Strong> Reliable and robust server infrastructure.
              </li>
              <li className="tw-mb-2">
                <Strong>Decryption on Request:</Strong> Secure delivery to authorized users.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default About;
