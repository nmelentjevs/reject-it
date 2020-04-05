import React from 'react';
import { StyleSheet, Modal, ScrollView } from 'react-native';
import { Block, Text, Button } from './common';
import { theme } from '../constants';

const Terms = ({ showTerms, setShowTerms }) => {
  return (
    <Modal animationType="slide" visible={showTerms}>
      <Block
        padding={[theme.sizes.padding * 2, theme.sizes.padding]}
        space="between"
      >
        <Text h2 light>
          Terms of Service
        </Text>

        <ScrollView style={{ paddingVertical: theme.sizes.padding }}>
          <Text
            caption
            gray
            height={24}
            style={{ marginBottom: theme.sizes.base }}
          >
            1. Your use of the Service is at your sole risk. The service is
            provided on an "as is" and "as available" basis.
          </Text>
          <Text
            caption
            gray
            height={24}
            style={{ marginBottom: theme.sizes.base }}
          >
            2. Support for Expo services is only available in English, via
            e-mail.
          </Text>
          <Text
            caption
            gray
            height={24}
            style={{ marginBottom: theme.sizes.base }}
          >
            3. You understand that Expo uses third-party vendors and hosting
            partners to provide the necessary hardware, software, networking,
            storage, and related technology required to run the Service.
          </Text>
          <Text
            caption
            gray
            height={24}
            style={{ marginBottom: theme.sizes.base }}
          >
            4. You must not modify, adapt or hack the Service or modify another
            website so as to falsely imply that it is associated with the
            Service, Expo, or any other Expo service.
          </Text>
          <Text
            caption
            gray
            height={24}
            style={{ marginBottom: theme.sizes.base }}
          >
            5. You may use the Expo Pages static hosting service solely as
            permitted and intended to host your organization pages, personal
            pages, or project pages, and for no other purpose. You may not use
            Expo Pages in violation of Expo's trademark or other rights or in
            violation of applicable law. Expo reserves the right at all times to
            reclaim any Expo subdomain without liability to you.
          </Text>
          <Text
            caption
            gray
            height={24}
            style={{ marginBottom: theme.sizes.base }}
          >
            6. You agree not to reproduce, duplicate, copy, sell, resell or
            exploit any portion of the Service, use of the Service, or access to
            the Service without the express written permission by Expo.
          </Text>
          <Text
            caption
            gray
            height={24}
            style={{ marginBottom: theme.sizes.base }}
          >
            7. We may, but have no obligation to, remove Content and Accounts
            containing Content that we determine in our sole discretion are
            unlawful, offensive, threatening, libelous, defamatory,
            pornographic, obscene or otherwise objectionable or violates any
            party's intellectual property or these Terms of Service.
          </Text>
          <Text
            caption
            gray
            height={24}
            style={{ marginBottom: theme.sizes.base }}
          >
            8. Verbal, physical, written or other abuse (including threats of
            abuse or retribution) of any Expo customer, employee, member, or
            officer will result in immediate account termination.
          </Text>
          <Text
            caption
            gray
            height={24}
            style={{ marginBottom: theme.sizes.base }}
          >
            9. You understand that the technical processing and transmission of
            the Service, including your Content, may be transferred unencrypted
            and involve (a) transmissions over various networks; and (b) changes
            to conform and adapt to technical requirements of connecting
            networks or devices.
          </Text>
          <Text
            caption
            gray
            height={24}
            style={{ marginBottom: theme.sizes.base }}
          >
            10. You must not upload, post, host, or transmit unsolicited e-mail,
            SMSs, or "spam" messages.
          </Text>
        </ScrollView>
        <Button gradient onPress={() => setShowTerms(false)}>
          <Text center white>
            I understand
          </Text>
        </Button>
      </Block>
    </Modal>
  );
};

const styles = StyleSheet.create({});

export default Terms;
